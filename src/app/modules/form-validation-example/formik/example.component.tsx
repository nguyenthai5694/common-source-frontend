import React, { useState } from 'react';
import ChangePassword from 'common/blocks/change-password/change-password.component';
import ExtendAttribute from 'common/blocks/extend-attribute-edit/extend-attribute.component';
import FormOutputSelect, { TypeFileOutput } from 'common/blocks/form-output-select/form-output-select.component'
import { CommonSelect } from 'common/form';
import Button from 'common/parts/button/button.component';
import { ModalService } from 'app/services/modal';
import { getFullPath } from 'app/services/route';

export default function Example() {
  // const [currentNode, setCurrentNode] = useState();
  const [dataExtend, setDataExtend] = useState([]);

  const handleShujuReferModal = () => {
  }

  const handleHozonKikanhyoModal = () => {
  }

  const bunsyoNo = 92035;

  const url = `${getFullPath('shuju-bunsyo-refer')}?viewMode=true&bunsyoNo=${bunsyoNo}&fushoCode=123564`;

  const openWindowModal = () => {
    window.open(url, '_blank', 'location=yes,height=1000,width=1200,resizable=1,scrollbars=yes,status=yes')
  }

  const url_time = `${getFullPath('hozonkikanhyolist')}?viewMode=true`;
  const openWindowTime = () => {
    window.open(url_time, '_blank', 'location=yes,height=1000,width=1400,scrollbars=yes,status=yes,resizable=1')
  }

  const handleFormOutput = () => {

  }
  const handleCsvOutput = () => {

  }

  const handleOutputForm = () => {
    const modalService = new ModalService()

    const submitForm = modalService.openPortalDialog(FormOutputSelect, {
      typeFileOutput: [TypeFileOutput.CSV],
    });

    submitForm.afterClosed().subscribe(data => {
      // console.log(data, 'data');
    })
  }
  const handleChangePassword = () => {
    const modalService = new ModalService()
    const submitForm = modalService.openPortalDialog(ChangePassword, {
      seimuShokuinNo: '2127',
      changePassSuccessProcess: () => { },
    });

    submitForm.afterClosed().subscribe(data => {
      // console.log(data, 'data');
    })
  }

  const handleDepartmentSearch = () => {
    // const modalService = new ModalService();
    // const submitForm = modalService.openPortalDialog(DepartmentSearch, {
    //   isSingleSelect: true,
    //   departmentList: departments,
    //   defaultNode: currentNodeDept,
    //   treeType: TreeTypeBusho.PERMANENT,
    //   selectableLevel: '0,1,2,3,4,5,6',

    // })

    // submitForm.afterClosed().subscribe(data => {
    //   if (!data) {
    //     return;
    //   }

    //   console.log(data);

    //   setDepartments(data?._departmentList);
    //   setCurrentNodeDept(data?.currentNode);
    // })
  }

  const handlePositionSearch = () => {
    // const modalService = new ModalService();
    // const submitForm = modalService.openPortalDialog(PositionSearch, {
    //   positionList: positions,
    //   isSingleSelect: true,
    //   orgDutyIds: ['12'],
    // })

    // submitForm.afterClosed().subscribe(data => {
    //   if (!data) {
    //     return;
    //   }

    //   setPosition(data?._positionList);
    // })
  }

  const handleStaffSearch = () => {
    // const modalService = new ModalService();
    // const submitForm = modalService.openPortalDialog(StaffSearch, {
    //   staffList: staffs,
    //   defaultNode: currentNodeStaff,
    //   isSingleSelect: true,
    //   includeSubStaff: selectionProcessStatusStaff,
    //   allBoxSelectedList: [{
    //     kaNo: 'K1041020000084107000000000000000',
    //     shokuinNo: 'zx0478090',
    //   },
    //   { shokuinNo: 'zx0478090', kaNo: 'K1041020000084107241020000000000' },
    //   {
    //     kaNo: 'K1041020000084107000000000000000',
    //     shokuinNo: 'zx0483155',
    //   },
    //   ],
    // })

    // submitForm.afterClosed().subscribe(data => {
    //   if (!data) {
    //     return;
    //   }

    //   setselectionProcessStatusStaff(data?.includeSubStaff)
    //   setCurrentNodeStaff(data?.currentNode);
    //   setStaffs(data?._staffList);
    // })
  }

  const handleAddRelatedBunsyo = () => {
    // const modalService = new ModalService();
    // const submitForm = modalService.openPortalDialog(AddRelatedBunsyo)

    // submitForm.afterClosed().subscribe(data => {
    //   console.log(data, 'data');
    // })
  }
  const handleShujuBunsyoAdd = () => {
    // const modalService = new ModalService();
    // const submitForm = modalService.openPortalDialog(ShujubunsyoAddModal, {
    //   bunNoSelectedLst: shujuData,
    // })

    // submitForm.afterClosed().subscribe(data => {
    //   if (!data) return;

    //   setShujuData(data.map(e => e.bunNo))
    //   console.log(data, 'data');
    // })
  }

  const handleUploadCsv = () => {
    // const modalService = new ModalService();
    // const submitForm = modalService.openPortalDialog(UploadCsv, {
    //   isDrapDrop: true,
    //   index: null,
    //   attachmentName: '',
    //   isOnlyCsv: true,
    // })

    // submitForm.afterClosed().subscribe(data => {
    //   if (!data) return;

    //   console.log(data, 'data');
    // })
  }
  const handleExtendAttribute = () => {
    const modalService = new ModalService();
    const submitForm = modalService.openPortalDialog(ExtendAttribute, {
      data: dataExtend,
    })

    submitForm.afterClosed().subscribe(data => {
      setDataExtend(data);
    })
  }

  const handleDownloadWait = () => {
    // const queries = {
    //   page: 1,
    //   size: 200,
    //   sort: {
    //     dataKey: 'aitesakiSekobi',
    //     type: 'desc',
    //   },
    //   filter: {
    //     'tani': '99',
    //     'keyword': '',
    //     'status': 'all',
    //     'processingStatusCd': 'all',
    //     'aitesakiSekobiFrom': '2021-06-01',
    //     'aitesakiSekobiTo': '2021-06-16',
    //     'displayColumns': [
    //       'bunshoId.fullBunId',
    //       'title',
    //       'bunJoName',
    //       'processingStatusNm',
    //       'aitesakiSekobi',
    //       'shujuSyokuinName',
    //       'listJushinKbnName',
    //       'aitesakiNm',
    //     ],
    //   },

    // } as DataTableQueries<any>;
    // const modalService = new ModalService();
    // const submitForm = modalService.openPortalDialog(DownloadWait, {
    //   handleDownload: shujukanryoDownload({
    //     formName: '受付完了一覧',
    //     taniNm: '個人',
    //     statusNm: 'すべて',
    //     processingStatusNm: 'すべて',
    //     kaNo: '10101010000000',
    //     kaNm: '総務局 総務部 総務課',
    //     flagDownloadAll: true,
    //     queries,
    //   }),
    // })

    // submitForm.afterClosed().subscribe(data => {
    //   if (!data) {
    //     return;
    //   }
    // })
  }

  const textPulldown = 'Pulldown list virtual scroll 受付完了一覧 総務局 総務部 総務課';
  const selectVirtual = {
    options: new Array(5000).fill(true).map((_, index) => ({
      label: 'Item ' + index + ' ' +
        textPulldown.substring(Math.random() * (textPulldown.length - 1), textPulldown.length - 1),
      value: index,
    })),
    options2: new Array(5000).fill(true).map((_, index) => ({
      label: 'Item ' + index,
      value: index,
    })),
    onChange: (e) => {
    },
  }

  return (
    <>
      <h2>Pulldown list virtual scroll random height</h2>

      <CommonSelect
        options={selectVirtual.options} size='l' width={160}
        defaultValue={50} onChange={selectVirtual.onChange}
      />

      <br />

      <h2>Pulldown list virtual scroll has filter random height</h2>

      <CommonSelect
        options={selectVirtual.options} size='l' width={160} maxLength={20}
        defaultValue={50} onChange={selectVirtual.onChange} filter={true}
      />

      <br />

      <h2>Pulldown list virtual scroll normal</h2>

      <CommonSelect
        options={selectVirtual.options2} size='l' width={160}
        defaultValue={50} onChange={selectVirtual.onChange}
      />

      <br />

      <h2>Pulldown list virtual scroll has filter</h2>

      <CommonSelect
        options={selectVirtual.options2} size='l' width={160}
        defaultValue={50} onChange={selectVirtual.onChange} filter={true}
      />

      <br />

      <h2>COM-SC210101</h2>

      <Button label='COM-SC210101' onClick={handlePositionSearch} theme='primary' />

      <br />

      <h2>COM-SC030101</h2>

      <Button label='COM-SC030101' onClick={handleDepartmentSearch} theme='primary' />

      <br />

      <h2>COM-SC040101</h2>

      <Button label='COM-SC040101' onClick={handleStaffSearch} theme='primary' />

      <br />

      <a href={url} target='_blank' rel='noopener noreferrer' onClick={openWindowModal}>COM-SC060401</a>

      <br />

      <Button label='COM-SC060401 Modal' onClick={handleShujuReferModal} theme='primary' />

      <br />

      <h2>COM-SC060501</h2>

      <Button label='COM-SC060501' theme='primary' onClick={handleAddRelatedBunsyo} />

      <br />

      <h2>COM-SC060101</h2>

      <Button label='COM-SC060101' theme='primary' onClick={handleShujuBunsyoAdd} />

      <br />

      <h2>COM-SC180101</h2>

      <Button label='COM-SC180101' theme='primary' onClick={handleUploadCsv} />

      <br />

      <h2>COM-SC220101 (from DAE-SC011004) (AFTER_ENFORCEMENT)</h2>

      <br />

      <h2>COM-SC050101</h2>

      <Button label='COM-SC050101' theme='primary' onClick={handleExtendAttribute} />

      <br />

      <h2>COM-SC090101</h2>

      <Button label='COM-SC090101' theme='primary' onClick={handleFormOutput} />

      <br />

      <h2>COM-SC070101</h2>

      <Button label='COM-SC070101' theme='primary' onClick={handleCsvOutput} />

      <br />

      <h2>COM-SC110101-USER</h2>

      <br />

      <h2>COM-SC080101</h2>

      <Button label='COM-SC080101' theme='primary' onClick={handleOutputForm} />

      <br />

      <h2>COM-SC190101</h2>

      <Button label='COM-SC190101' theme='primary' onClick={handleChangePassword} />

      <br />

      <h2>COM-SC120101</h2>

      <Button label='COM-SC120101' theme='primary' onClick={handleDownloadWait} />

      <br />

      <h2>COM-SC200101</h2>

      <Button label='COM-SC200101 Modal' onClick={handleHozonKikanhyoModal} theme='primary' />

      <a href={url_time} target='_blank' rel='noopener noreferrer' onClick={openWindowTime}>COM-SC200101</a>
    </>
  )
}
