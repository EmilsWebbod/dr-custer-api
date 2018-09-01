"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
//const FieldWrapper = styled.div`
//  position: relative;
//`;
var ReferenceInput = /** @class */ (function (_super) {
    __extends(ReferenceInput, _super);
    function ReferenceInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selecting: false,
            target: undefined,
            selected: _this.props.defaultSelected || []
        };
        return _this;
        //private select = (items: IItem[]) => {
        //  const { onSelect } = this.props;
        //
        //  this.setState({
        //    selecting: false,
        //    selected: items
        //  });
        //
        //  if (typeof onSelect === 'function') {
        //    onSelect(items);
        //  }
        //};
    }
    ReferenceInput.prototype.render = function () {
        return 'Todo: Fix referenceInput';
        /*
        const {
          fieldID,
          endpoint,
          queryKey,
          labelKey,
          singular,
          data,
          onAdd,
          onRemove,
          required,
          autoFocus,
          label
        } = this.props;
    
        const { selecting, selected, target } = this.state;
    
        return (
          <FieldWrapper>
            <Input
              id={fieldID}
              value={selected.map(s => s.label).join(', ')}
              required={required}
              autoFocus={autoFocus}
              label={label}
              onClick={e => {
                if (!selecting) {
                  this.setState({
                    target: e.currentTarget,
                    selecting: true
                  });
                }
              }}
            />
            <Popover
              open={selecting}
              anchorEl={target}
              onClose={() =>
                this.setState({
                  selecting: false
                })
              }
            >
              {selecting && (
                <SearchAndSelect
                  endpoint={endpoint}
                  labelKey={labelKey}
                  queryKey={queryKey}
                  onCommit={this.select}
                  selectedItems={selected}
                  singular={singular}
                  data={data}
                  autoFocus
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              )}
            </Popover>
          </FieldWrapper>
        );
        */
    };
    return ReferenceInput;
}(React.Component));
exports.default = ReferenceInput;
//# sourceMappingURL=ReferenceInput.js.map