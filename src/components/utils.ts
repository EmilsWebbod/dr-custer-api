import { IUpdateDeleteProps } from './UpdateDelete';
import {
  IFieldValues,
  ILabel,
  ISubdocument,
  ISubdocumentData,
  IUpdateDeleteField
} from './interface';
import apiRequest from '../../api/apiRequest';

// Should be used with a Array reduce.
// Reduces the valid fields to { [key: name]: value }
export const isFieldEligibleForSave = <T>(props: IUpdateDeleteProps<T>) => (
  obj: object,
  element: IUpdateDeleteField<IFieldValues>
): object => {
  const { forceSaveAllField, id, fields } = props;

  if (forceSaveAllField || !id || !fields) {
    obj[element.name] = element.value;
    return obj;
  }

  const field = fields.find(f => f.name === element.name);

  if (!field || field.value !== element.value) {
    obj[element.name] = element.value;
  }

  return obj;
};

export const updateInternalFieldFromValues = <T>(
  name: string,
  value: T,
  label: ILabel,
  fields?: Array<IUpdateDeleteField<IFieldValues>>
) => (f: IUpdateDeleteField<IFieldValues>) => {
  const field = { ...f };
  const defaultField = (fields || []).find(x => x.name === name);

  if (field.name === name) {
    field.value = value;
    field.label = label;

    if (defaultField) {
      field.changed = value !== defaultField.value;
    }
  }

  return field;
};

export const markSubdocumentForAddition = (
  name: string,
  data: ISubdocumentData,
  subdocuments?: ISubdocument[]
) => (s: ISubdocument): ISubdocument => {
  const doc: any = { ...s };

  if (doc.name === name) {
    if (shouldCommitWithSubdocuments(name, data._id, subdocuments)) {
      doc.create.push(data);
      doc.changed = true;
    } else {
      doc.changed = false;
    }

    doc.previews.push(data);
    doc.delete = doc.delete.filter((d: any) => d !== data._id);
  }

  return doc;
};

export const markSubdocumentForDeletion = (
  name: string,
  id: string,
  subdocuments?: ISubdocument[]
) => (s: ISubdocument): ISubdocument => {
  const doc: any = { ...s };

  if (doc.name === name) {
    if (shouldCommitWithSubdocuments(name, id, subdocuments)) {
      doc.delete.push(id);
      doc.changed = true;
    } else {
      doc.changed = false;
    }

    doc.previews = doc.previews.filter((d: any) => d._id !== id);
    doc.create = doc.create.filter((d: any) => d._id !== id);
  }

  return doc;
};

function shouldCommitWithSubdocuments(
  name: string,
  id: string,
  subdocuments?: ISubdocument[]
) {
  if (subdocuments) {
    const defaultDoc = subdocuments.find(d => d.name === name);

    if (defaultDoc && !defaultDoc.previews.some(p => p._id === id)) {
      return false;
    }
  }
  return true;
}

export async function createSubdocumentsRequests<T>(
  doc: ISubdocument,
  baseEndpoint: string
) {
  const requests: Array<Promise<T>> = [];
  if (Array.isArray(doc.create)) {
    for (const createData of doc.create) {
      requests.push(
        apiRequest<T>(`${baseEndpoint}/${doc.endpoint}`, {
          method: 'POST',
          data: {
            [doc.name]: createData.value
          }
        })
      );
    }
  }
  Promise.all(requests).then(responses => {
    return responses.filter(x => x !== null);
  });
}

export async function deleteSubdocumentRequest<T>(
  doc: ISubdocument,
  baseEndpoint: string
) {
  const requests: Array<Promise<T>> = [];
  if (Array.isArray(doc.delete)) {
    for (const deleteID of doc.delete) {
      requests.push(
        apiRequest<T>(`${baseEndpoint}/${doc.endpoint}/${deleteID}`, {
          method: 'DELETE'
        })
      );
    }
  }
  Promise.all(requests).then(responses => {
    return responses.filter(x => x !== null);
  });
}
