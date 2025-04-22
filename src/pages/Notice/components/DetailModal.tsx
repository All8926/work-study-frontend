import '@umijs/max';
import { Modal} from 'antd';
import React from 'react';



interface Props {
  oldData?: API.NoticeVO;
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}


/**
 * 详情弹窗
 * @param props
 * @constructor
 */
const DetailModal: React.FC<Props> = (props) => {
  const {oldData, visible, onCancel } = props;


  if (!oldData) {
    return <></>;
  }

  return (
    <>
      <Modal
        width={'45%'}
        destroyOnClose
        title={'详情'}
        open={visible}
        footer={null}
        onCancel={() => {
          onCancel?.();
        }}
      >

        <>
          <div style={{fontSize: '22px', fontWeight: 'bold',textAlign:'center',marginBottom:'20px'}}>{oldData.title}</div>
          <div  dangerouslySetInnerHTML={{ __html: oldData.content as string }} />
          <div style={{textAlign:'right',color:'#999',marginTop:'20px'}}>发布时间: {oldData.publishTime || '暂未发布'}</div>
        </>

      </Modal>

    </>

  );
};
export default DetailModal;
