import { ICrudField, IUpdateDeleteFieldMethods } from './interface';

export function shouldHideFieldIfConditionNotMet(
  f: ICrudField,
  methods: IUpdateDeleteFieldMethods
): boolean {
  if (f.hideIfSet || f.showIfSet) {
    const queryString = f.hideIfSet || f.showIfSet || '';
    const targetValue = methods.getField(queryString).value;

    if (
      (f.hideIfSet && Boolean(targetValue)) ||
      (f.showIfSet && !Boolean(targetValue))
    ) {
      return true;
    }
  }
  return false;
}
export const shouldRenderCustomComponent = (f: ICrudField) =>
  f.type === 'customComponent';
