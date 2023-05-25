import Box from '@mui/material/Box';
import { jsx as _jsx } from 'react/jsx-runtime';
import { jsxs as _jsxs } from 'react/jsx-runtime';
import _extends from '@babel/runtime/helpers/esm/extends';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import {
  useGridSelector, gridFilteredDescendantCountLookupSelector,
  getDataGridUtilityClass,
} from '../../x-data-grid-pro';
import { useGridApiContext } from '../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../hooks/utils/useGridRootProps';

const useUtilityClasses = ownerState => {
  const {
    classes,
  } = ownerState;
  const slots = {
    root: ['groupingCriteriaCell'],
    toggle: ['groupingCriteriaCellToggle'],
  };

  return composeClasses(slots, getDataGridUtilityClass, classes);
};

export function GridGroupingCriteriaCell(props) {
  var _filteredDescendantCo, _rootProps$slotProps;
  const {
    id,
    field,
    rowNode,
    hideDescendantCount,
    formattedValue,
  } = props;
  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext();
  const ownerState = {
    classes: rootProps.classes,
  };
  const classes = useUtilityClasses(ownerState);
  const filteredDescendantCountLookup = useGridSelector(apiRef, gridFilteredDescendantCountLookupSelector);
  const filteredDescendantCount = (_filteredDescendantCo = filteredDescendantCountLookup[rowNode.id]) != null ?
    _filteredDescendantCo : 0;
  const Icon = rowNode.childrenExpanded ?
    rootProps.slots.groupingCriteriaCollapseIcon : rootProps.slots.groupingCriteriaExpandIcon;
  const handleKeyDown = event => {
    if (event.key === ' ') {
      // We call event.stopPropagation to avoid unfolding the row and also scrolling to bottom
      // TODO: Remove and add a check inside useGridKeyboardNavigation
      event.stopPropagation();
    }

    apiRef.current.publishEvent('cellKeyDown', props, event);
  };
  const handleClick = event => {
    apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
    apiRef.current.setCellFocus(id, field);
    event.stopPropagation();
  };
  const marginLeft = rootProps.rowGroupingColumnMode === 'multiple' ? 0 : rowNode.depth * 2;
  let cellContent;
  const colDef = apiRef.current.getColumn(rowNode.groupingField);

  if (typeof colDef.renderCell === 'function') {
    cellContent = colDef.renderCell(props);
  } else if (typeof formattedValue !== 'undefined') {
    cellContent = /*#__PURE__*/_jsx('span', {
      children: formattedValue,
    });
  } else {
    cellContent = /*#__PURE__*/_jsx('span', {
      children: rowNode.groupingKey,
    });
  }

  return /*#__PURE__*/_jsxs(Box, {
    className: classes.root,
    sx: {
      ml: marginLeft,
    },
    children: [/*#__PURE__*/_jsx('div', {
      className: classes.toggle,
      children: filteredDescendantCount > 0 && /*#__PURE__*/_jsx(rootProps.slots.baseIconButton, _extends({
        size: 'small',
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: -1,
        'aria-label': rowNode.childrenExpanded ?
          apiRef.current.getLocaleText('treeDataCollapse') : apiRef.current.getLocaleText('treeDataExpand'),
      }, (_rootProps$slotProps = rootProps.slotProps) == null ? void 0 : _rootProps$slotProps.baseIconButton, {
        children: /*#__PURE__*/_jsx(Icon, {
          fontSize: 'inherit',
        }),
      })),
    }), cellContent, !hideDescendantCount && filteredDescendantCount > 0 ? /*#__PURE__*/_jsxs('span', {
      style: {
        whiteSpace: 'pre',
      },
      children: [' (', filteredDescendantCount, ')'],
    }) : null],
  });
}