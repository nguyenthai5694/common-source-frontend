import * as React from 'react';
import { GridCallbackDetails, GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import GenericComponent from 'common/utils/generic/generic.component';
import { DatatableContext } from './datatable.context';
import DataTableTemplate from './datatable.template';
import { DataTableProps, DataTableQueries, DataTableState } from './datatable.type';

export default class DataTable extends GenericComponent<DataTableProps, DataTableState>{
  /**
   * DataTableState
   * Config Init Values State
   */
  state: DataTableState = {
    columns: [],
    rows: [],
    tableConfig: null,
    columnsConfig: null,
    settingData: null,
    sortData: null,
    initialState: {},
    pinnedColumns: {},
    paginationModel: {
      page: 0,
      pageSize: 10,
    },
  };

  /**
   * Layout Ref
   */
  canvasRef = React.createRef() as any;

  /**
   * DataTableQueries
   */
  queries: DataTableQueries

  /**
   * Width Window
   */
  windowWidth = window.innerWidth

  /**
   * Height Window
   */
  windowHeight = window.innerHeight

  /**
   * Check event handSetHeight Table
   */
  isCheck = true

  /**
   * Event DidMount
   */
  componentDidMount(): void {
    this.queries = this.props.queries

    this.setState({
      ...this.state,
      paginationModel: {
        page: this.props.queries.page - 1,
        pageSize: this.props.queries.size,
      },
      pinnedColumns: {
        left: this.props.tableConfig.pinnedColumnsLeft,
        right: this.props.tableConfig.pinnedColumnsRight,
      },
      columns: this.handConvertColumns(),
    })
  }

  /**
   * Event convert column config to GridColDef
   * @returns GridColDef
   */
  handConvertColumns = () => {
    let totalWidth = 1

    if (this.canvasRef.current) {
      const refWidth = this.canvasRef.current.offsetWidth

      this.props.columnsConfig.forEach(item => {
        totalWidth += item.width
      })

      return this.props.columnsConfig.map(item => {
        return {
          field: item.field,
          headerName: item.headerName,
          align: item.align,
          width: totalWidth >= refWidth ? item.width : (item.width * refWidth / totalWidth),
          editable: item.editable || false,
          type: item.field === 'actions' ? 'actions' : '',
          sortable: item.disableSort ? false : true,
          renderCell: item.component ? (dataItem) => {
            return <>
              <item.component
                dataItem={dataItem.row}
                buttons={item.buttons}
                onActionClick={this.props.onActionClick}
              />
            </>
          } : undefined,
        } as GridColDef
      })
    }
  }

  /**
   * 
   * @param prevProps Event Update
   * @param prevState 
   * @param snapshot 
   */
  componentDidUpdate(prevProps: Readonly<DataTableProps>, prevState: Readonly<DataTableState>, snapshot?: any): void {
    if (prevProps !== this.props) {
      this.setState({
        ...this.state,
        paginationModel: {
          page: this.props.queries.page - 1,
          pageSize: this.props.queries.size,
        },
      })
    }
  }

  /**
   * Event change pagination
   * @param model 
   * @param details 
   */
  handPaginationModelChange = (model: GridPaginationModel, details: GridCallbackDetails) => {
    this.queries.page = model.page + 1
    this.queries.size = model.pageSize

    this.props.onSearch(this.queries)
  }

  /**
   * Event sort
   * @param params 
   * @param event 
   * @param details 
   */
  handleModelSort = (sortModel: GridSortModel) => {
    if (sortModel.length) {
      if (sortModel[0].field === this.queries.sort.dataKey) {
        this.queries.sort.type = this.queries.sort.type === 'asc' ? 'desc' : 'asc'
      } else {
        this.queries.sort.dataKey = sortModel[0].field
      }

      this.props.onSearch(this.queries)
    }
  }

  /**
   * 
   * @param filter Event search filter
   */
  onHeaderSearch = (filter: any) => {
    this.queries.filter = filter
    this.props.onSearch(this.queries)
  }

  /**
   * Render
   */
  render() {
    const { props } = this;

    return (

      <DatatableContext.Provider
        value={{
          dataItems: props.dataItems,
          columnsConfig: props.columnsConfig,
          tableConfig: props.tableConfig,
          onSearch: props.onSearch,
          dataTableQueries: {} as any,
          totalItem: props.totalItem,
          checkType: props.selectItemType,
        }}
      >
        <DataTableTemplate self={this} />
      </DatatableContext.Provider>

    )
  }
}
