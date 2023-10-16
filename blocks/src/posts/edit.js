import {
    useBlockProps,
    RichText,
    InspectorControls,
} from "@wordpress/block-editor";

import {
    SelectControl,
    ToggleControl,
    TextControl,
    PanelBody,
} from "@wordpress/components";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const onChangeBGColor = (hexColor) => {
        setAttributes({ bg_color: hexColor });
    };

    const onChangeTextColor = (hexColor) => {
        setAttributes({ text_color: hexColor });
    };

    return (
        <div {...blockProps}>
            <InspectorControls key="setting">
                <PanelBody title="Settings" initialOpen={true}>
                    <SelectControl
                        label="Post type"
                        value={attributes.postType}
                        options={[
                            { label: "Post", value: "posts" },
                            { label: "Tutorial", value: "tutorials" },
                        ]}
                        onChange={(postType) => setAttributes({ postType })}
                        __nextHasNoMarginBottom
                    />

                    <ToggleControl
                        label="Show header"
                        checked={attributes.showHeader}
                        onChange={(showHeader) =>
                            setAttributes({ showHeader: !!showHeader })
                        }
                    />

                    <TextControl
                        label="Button URL"
                        value={attributes.buttonURL}
                        onChange={(buttonURL) => setAttributes({ buttonURL })}
                    />

                    <TextControl
                        label="Post category"
                        value={attributes.postCategory}
                        onChange={(postCategory) =>
                            setAttributes({ postCategory })
                        }
                    />
                </PanelBody>
            </InspectorControls>

            <div className="bg-gray-100 px-4 py-10 md:py-14 lg:py-20">
                <div className="max-w-[980px] mx-auto">
                    {attributes.showHeader && (
                        <div className="flex justify-between items-center mb-7">
                            <RichText
                                tagName="div"
                                className="text-gray-800 font-bold text-base md:text-[26px]"
                                withoutInteractiveFormatting
                                value={attributes.headerText}
                                onChange={(headerText) =>
                                    setAttributes({ headerText })
                                }
                            />

                            <RichText
                                tagName="div"
                                className="btn-white"
                                withoutInteractiveFormatting
                                value={attributes.buttonText}
                                onChange={(buttonText) =>
                                    setAttributes({ buttonText })
                                }
                            />
                        </div>
                    )}

                    <article className="bg-white rounded-[20px] md:px-7 md:py-5 md:pr-5 md:grid md:grid-cols-[70%_30%] items-center mt-4 md:mt-5">
                        <div className="px-4 py-5 md:py-0 md:px-0 md:pr-5">
                            <div className="text-gray-500 uppercase text-xs">
                                january 12, 2024
                            </div>

                            <div className="text-lg md:text-2xl text-gray-800 mt-5 md:mt-7 font-semibold">
                                Magni possimus minima, tempore maiores corrupti
                            </div>

                            <div className="hidden md:block text-gray-600 text-lg leading-normal font-light mt-2">
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Magni possimus minima, tempore
                                maiores corrupti suscipit maxime.
                            </div>
                        </div>

                        <div>
                            <img
                                className="rounded-lg block object-cover h-52 w-full"
                                src="data:image/svg+xml,%3Csvg width='210' height='170' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='206' height='166' style='fill:%23dedede;stroke:%23555555;stroke-width:2'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' font-family='monospace, sans-serif' fill='%23555555'%3Epost humbnail%3C/text%3E%3C/svg%3E"
                            />
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
