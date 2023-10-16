import {
    useBlockProps,
    RichText,
    AlignmentToolbar,
    BlockControls,
} from "@wordpress/block-editor";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    const getAlign = (aligment) => {
        const alignMap = {
            left: "justify-start",
            center: "justify-center",
            right: "justify-end",
        };

        return alignMap[aligment];
    };

    return (
        <div {...blockProps}>
            <BlockControls group="block">
                <AlignmentToolbar
                    value={attributes.alignment}
                    onChange={(alignment) => setAttributes({ alignment })}
                />
            </BlockControls>

            <div className={`flex ${getAlign(attributes.alignment)}`}>
                <RichText
                    className="bg-gray-100 text-gray-800 text-sm font-semibold py-2.5 px-4 rounded-full"
                    tagName="p"
                    value={attributes.text}
                    withoutInteractiveFormatting
                    onChange={(text) => setAttributes({ text })}
                />
            </div>
        </div>
    );
}
