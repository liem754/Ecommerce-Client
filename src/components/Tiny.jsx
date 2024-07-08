import { Editor } from "@tinymce/tinymce-react";
import { memo, useRef } from "react";
function Tiny({ label, value, setValue, nameKey, setInvalids, invalids, fix }) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <div className=" flex flex-col gap-1">
            <h2 className=" font-medium ">{label}</h2>
            <Editor
                onFocus={e => {
                    e.stopPropagation();
                    setInvalids([]);
                }}
                apiKey="l810lnmofp4y2z62zw4ghkyd9l1m9df96k53427d3mszfpcy"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={value}
                init={{
                    height: fix ? 300 : 500,
                    menubar: true,
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "preview",
                        "help",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onChange={e =>
                    setValue(pre => ({
                        ...pre,
                        [nameKey]: e.target.getContent(),
                    }))
                }
            />
            {invalids?.length > 0 && invalids.some(i => i.name === nameKey) && (
                <small className="text-red-500 text-xs">
                    {invalids.find(i => i.name === nameKey)?.messeger}
                </small>
            )}
        </div>
    );
}

export default memo(Tiny);
