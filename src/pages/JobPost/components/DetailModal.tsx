import {auditJobPostUsingPost} from '@/services/backend/jobPostController';
import {useAccess} from '@@/exports';
import {
  ProForm,
  ProFormDependency, ProFormInstance,
  ProFormRadio, ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Descriptions, DescriptionsProps, Form, message, Modal, Upload} from 'antd';
import React, {useRef, useState} from 'react';
import {Access} from 'umi';
import {checkFile, checkImageFile} from "@/utils";
import {UploadFile, UploadProps} from "antd/lib/upload/interface";
import {uploadFileUsingPost} from "@/services/backend/fileController";
import {UploadOutlined} from "@ant-design/icons";

interface Props {
  oldData?: API.JobPostVO;
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
  const {oldData, visible, onCancel, onSubmit} = props;
  const access = useAccess();
  // 申请面试弹窗
  const [applyVisible, setApplyVisible] = React.useState<boolean>(false);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [pathList, setPathList] = useState<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const formRef = useRef<ProFormInstance>();

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.response?.data as string));
    setPreviewTitle(file.name || '');
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);


  const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      const result = await uploadFileUsingPost({ biz: 'interview' }, {}, file as File);
      (file as any).url = result.data; // 让上传组件能预览
      onSuccess?.(result, file);
    } catch (err) {
      message.error('上传失败');
      onError?.(err as any);
    }
  };

  // 状态映射表
  const statusMap: { [key: number]: string } = {
    0: '审核中',
    1: '招聘中',
    2: '已下线',
    3: '审核不通过',
    4: '未知状态',
  };


  const items: DescriptionsProps['items'] = [

    {
      key: '2',
      label: '薪资',
      children: oldData?.salary,
    },
    {
      key: '3',
      label: '招聘人数',
      children: oldData?.maxCount || '不限',
    },
    {
      key: '4',
      label: '截止时间',
      children: oldData?.expirationTime,
    },
    {
      key: '5',
      label: '当前状态',
      children: statusMap[oldData?.status ?? 4],
    },

    {
      key: '6',
      label: '公司名称',
      children: oldData?.user?.nickName,
    },
    {
      key: '9',
      label: '工作地点',
      children: oldData?.workAddress,
    },
    {
      key: '7',
      label: '联系人',
      children: oldData?.user?.userName,
    },
    {
      key: '8',
      label: '联系方式',
      children: oldData?.user?.userPhone,
    },

    {
      key: '10',
      label: '岗位描述',
      children: oldData?.description,
      span: 2,
    },
    {
      key: '11',
      label: '任职要求',
      children: oldData?.requirement,
      span: 2,
    },
    {
      key: '12',
      label: '创建时间',
      children: oldData?.createTime,
    },
    {
      key: '13',
      label: '更新时间',
      children: oldData?.updateTime,
    },
  ];

  /**
   * 审核节点
   * @param fields
   */
  const handleUpdate = async (fields: API.AuditRequest) => {
    const hide = message.loading('正在操作');
    console.log('fields', fields);
    try {
      await auditJobPostUsingPost(fields);
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  if (!oldData) {
    return <></>;
  }

  return (
    <>
      <Modal
        width={'40%'}
        destroyOnClose
        title={'详情'}
        open={visible}
        footer={null}
        onCancel={() => {
          onCancel?.();
        }}
      >
        <Descriptions style={{whiteSpace: 'pre-wrap'}} column={2} title={oldData.title} items={items}></Descriptions>
        <Descriptions style={{marginTop: '15px'}} column={2}>
          {(oldData.status ?? 0) === 3 && (
            <>
              <Descriptions.Item label="拒绝原因" key={'14'} span={1}>
                {oldData.rejectReason}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>

        <Access accessible={access.canAdmin} fallback={null}>
          {oldData.status === 0 && (
            <ProForm
              style={{marginTop: 24}}
              layout="horizontal"
              onFinish={async (values) => {
                console.log('表单提交数据：', values);
                const success = await handleUpdate({...values, id: oldData.id});
                if (success) {
                  onSubmit?.();
                }
              }}
            >
              <ProFormRadio.Group
                style={{marginTop: 16}}
                rules={[{required: true, message: '请选择状态'}]}
                name="status"
                label="审核"
                options={[
                  {
                    label: '通过',
                    value: 1,
                  },
                  {
                    label: '拒绝',
                    value: 0,
                  },
                ]}
              />
              <ProFormDependency name={['status']}>
                {({status}) => {
                  if (status === 0) {
                    return (
                      <ProFormTextArea
                        name="reason"
                        label="拒绝原因"
                        rules={[{required: true, message: '请输入拒绝原因'}]}
                      />
                    );
                  }
                  return null;
                }}
              </ProFormDependency>
            </ProForm>
          )}
        </Access>
        <Access accessible={access.canUser} fallback={null}>
            { oldData.status === 1 && <Button type={"primary"} onClick={() => setApplyVisible(true)} style={{marginTop: '15px'}}>
              申请面试
            </Button>}
        </Access>
      </Modal>
      <Modal title={'申请面试'} open={applyVisible} onCancel={() => setApplyVisible(false)} footer={null} zIndex={1000} maskClosable={false}>
        <ProForm
          submitter={{
            searchConfig: {
              resetText: '取消',
            },
          }}
          // 取消按钮操作
          onReset={ () => { setApplyVisible(false); }}
          onFinish={async (values) => {
            values.imageList = pathList;
            console.log('表单提交数据：', values);
            // const success = await handleAdd(values);
            // if (success) {
            //   onSubmit?.(values);
            // }
          }}
        >
          <ProFormText rules={[{ required: true, message: '标题不能为空' }]} name="title" label="标题" />
          <ProFormTextArea name="content" label="详情" />

          <Form.Item
            label="附件"
            name="imageList"

          >
            <Upload
              accept="*"
              multiple
              fileList={fileList}
              customRequest={customRequest}
              beforeUpload={(file) => checkFile(file)}
              onChange={(info) => {
                let newFileList = [...info.fileList];
                newFileList = newFileList.slice(-2);
                console.log('fileList:', newFileList);
                setFileList(newFileList);
                const urls = newFileList
                  .filter((file) => file.status === 'done' && (file.url || file.response?.data))
                  .map((file) => file.url || file.response?.data);
                setPathList(urls);
              }}

            >
               <Button icon={<UploadOutlined />}>上传</Button>
            </Upload>
          </Form.Item>
        </ProForm>
      </Modal>
    </>
  );
};
export default DetailModal;
