import { useBlockProps, RichText } from "@wordpress/block-editor";

import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <div className="px-4 bg-white py-10 lg:py-14 text-center">
                <div className="flex flex-wrap justify-center items-center max-w-lg mx-auto">
                    <RichText
                        className="font-bold basis-full text-lg lg:text-3xl text-hot-gradient"
                        tagName="div"
                        value={attributes.title}
                        withoutInteractiveFormatting
                        onChange={(title) => setAttributes({ title })}
                    />

                    <RichText
                        className="basis-full text-[16px] font-light text-gray-600 leading-normal mt-3 md:text-lg"
                        tagName="p"
                        value={attributes.text}
                        withoutInteractiveFormatting
                        onChange={(text) => setAttributes({ text })}
                    />

                    <div className="basis-full max-w-sm mx-auto mt-6 sm:mt-8 text-left">
                        <div className="relative">
                            <div
                                className={`${blockProps.className}__input block w-full p-3.5 pl-5 text-sm font-medium border rounded-lg bg-white`}
                            >
                                Email address
                            </div>

                            <div className="flex items-center justify-center text-sm text-white right-0 bottom-0 mt-3 w-full border-gray-800 border-solid border-[1px] bg-gray-800 rounded-l-lg rounded-r-lg px-8 transition-colors sm:absolute sm:h-full sm:mt-0 sm:rounded-l-none sm:w-auto">
                                <span>Subscribe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
