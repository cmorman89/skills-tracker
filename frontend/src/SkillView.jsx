import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Divider from "./Divider";
import TextInput from "./TextInput";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import TextWithPlus from "./TextWithPlus";

const SkillView = () => {
    return (
        <div className="flex flex-grow w-auto max-w-4xl mx-auto items-center justify-center p-2 bg-slate-400/40 rounded-2xl shadow-xl">
            <div className="flex flex-col flex-grow p-6 max-w-4xl mx-auto bg-slate-800/80 text-slate-300 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-sky-200">Skills View</h1>
                <Divider />
                <div className="mb-4">
                    <TextInput
                        label="Search"
                        placeholder="Search..."
                    />
                    <div>

                        {/* Start tree block */}
                        <div className="flex flex-col">
                            {/* Root node */}
                            <TextWithPlus text="Python" />
                            {/* Child node */}
                            <div className="flex pl-6">
                                <div className="flex flex-col min-h-1">
                                    <div className="block border-2 border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                                    <div className="block border-2 border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                                </div>
                                <TextWithPlus text="Child" />
                            </div>
                            {/* Child node */}
                            <div className="flex pl-6">
                                <div className="flex flex-col min-h-1">
                                    <div className="block border-2  border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                                    <div className="block border-2 border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                                </div>
                                <TextWithPlus text="Child" />
                            </div>
                            {/* Child node */}
                            <div className="flex pl-6">
                                <div className="flex flex-col min-h-1">
                                    <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-7"></div>
                                    <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 flex-grow"></div>
                                </div>
                                <div className="flex flex-col">
                                    <TextWithPlus text="Child" />
                                    <TextWithPlus text="Python" />

                                    <TextWithPlus text="Python" />
                                    <TextWithPlus text="Python" />
                                    <TextWithPlus text="Python" />
                                    <TextWithPlus text="Python" />
                                    <TextWithPlus text="Python" />
                                </div>
                            </div>
                            {/* Terminal Child node */}
                            <div className="flex pl-6">
                                <div className="flex flex-col min-h-1">
                                    <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                                </div>
                                <TextWithPlus text="Child" />
                            </div>
                        </div>


                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCode} />
                        <TextWithPlus text="Python" />
                        <div className="flex pl-6">
                            <div className="flex flex-col min-h-1">
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                            </div>
                            <TextWithPlus text="Python" />
                        </div>
                        <div className="flex pl-6">
                            <div className="flex flex-col min-h-1">
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                            </div>
                            <TextWithPlus text="Python" />
                        </div>
                        <div className="flex pl-6">
                            <div className="flex flex-col min-h-1">
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                            </div>
                            <div className="flex flex-col min-h-1 pl-6">
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                            </div>
                            <TextWithPlus text="Python" />
                        </div>
                        <div className="flex pl-6">
                            <div className="flex flex-col min-h-1">
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 border-b-0 w-6 h-1/2"></div>
                            </div>
                            <div className="flex flex-col min-h-1 pl-6">
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                            </div>
                            <TextWithPlus text="Python" />
                        </div>
                        <div className="flex pl-6">
                            <div className="flex flex-col min-h-1">
                                <div className="block border-2 border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                            </div>
                            <TextWithPlus text="Python" />
                        </div>
                        <div className="flex pl-6">
                            <div className="flex flex-col min-h-1">
                                <div className="block w-6 h-1/2"></div>
                            </div>
                            <div className="flex flex-col min-h-1 pl-6">
                                <div className="block border-2 round border-slate-400 border-t-0 border-r-0 w-6 h-1/2"></div>
                            </div>
                            <TextWithPlus text="Python" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default SkillView;