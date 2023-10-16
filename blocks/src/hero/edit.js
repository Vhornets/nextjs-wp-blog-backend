import {
    useBlockProps,
    RichText,
    InspectorControls,
} from "@wordpress/block-editor";

import { ToggleControl, PanelBody } from "@wordpress/components";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <InspectorControls key="setting">
                <PanelBody title="Settings" initialOpen={true}>
                    <ToggleControl
                        label="Show badge"
                        checked={attributes.showBadge}
                        onChange={(showBadge) =>
                            setAttributes({ showBadge: !!showBadge })
                        }
                    />
                </PanelBody>
            </InspectorControls>

            <div className="bg-white px-4 text-center pt-14 pb-10 md:pt-20 md:pb-14 lg:pt-28 lg:pb-20">
                <div className="flex flex-wrap justify-center items-center mx-auto max-w-[980px]">
                    {attributes.showBadge && (
                        <RichText
                            className="bg-gray-100 text-gray-800 text-sm font-semibold py-2.5 px-4 rounded-full"
                            tagName="span"
                            value={attributes.badge}
                            withoutInteractiveFormatting
                            onChange={(badge) => setAttributes({ badge })}
                        />
                    )}

                    <RichText
                        className="basis-full text-3xl font-bold leading-tight tracking-tighter text-hot-gradient mt-10 md:text-5xl lg:text-7xl"
                        tagName="div"
                        value={attributes.title}
                        withoutInteractiveFormatting
                        onChange={(title) => setAttributes({ title })}
                    />

                    <RichText
                        className="basis-full text-lg font-light text-gray-600 leading-normal mt-5 max-w-[720px] mx-auto md:text-2xl lg:text-[28px]"
                        tagName="p"
                        value={attributes.text}
                        withoutInteractiveFormatting
                        onChange={(text) => setAttributes({ text })}
                    />
                </div>
            </div>
        </div>
    );
}
