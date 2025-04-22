import React, {  useState, useEffect } from 'react';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { uploadFileUsingPost } from '@/services/backend/fileController';
import { message } from 'antd';

interface WangEditorProps {
  value: string;
  onChange: (html: string) => void;
  height?: number;
}

const WangEditor: React.FC<WangEditorProps> = ({ value, onChange, height = 400 }) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null); // 控制 toolbar 是否显示
  const [html, setHtml] = useState<string>(value);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
  };

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        fieldName: 'file',
        async customUpload(file: File, insertFn: (url: string) => void) {
          try {
            // 校验图片大小
            if (file.size > 1024 * 1024 * 2) {
              message.error('图片大小不能超过2MB');
              return;
            }
            const res = await uploadFileUsingPost({ biz: 'notice_image' }, {}, file);
            insertFn(res.data as string); // 插入图片链接
          } catch (err) {
            message.error('图片上传失败');
          }
        },
      },
    },
  };

  // 内容更新
  const handleEditorChange = (editor: IDomEditor) => {
    const htmlContent = editor.getHtml();
    setHtml(htmlContent);
    onChange(htmlContent);
  };

  useEffect(() => {
    setHtml(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      {editor && (
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
        />
      )}
      <Editor
        value={html}
        defaultConfig={editorConfig}
        onCreated={setEditor}
        onChange={handleEditorChange}
        mode="default"
        style={{ height, border: '1px solid #ccc', zIndex: 100 }}
      />
    </>
  );
};

export default WangEditor;
