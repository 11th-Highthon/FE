import { useState } from "react";
import { Icon } from "../../components/Icon";

export const CreateStory = () => {
    const [useAI, setUseAI] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [missions, setMissions] = useState<string[]>([""]);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const addMission = () => {
        setMissions([...missions, ""]);
    };

    const updateMission = (index: number, value: string) => {
        const newMissions = [...missions];
        newMissions[index] = value;
        setMissions(newMissions);
    };

    const removeMission = (index: number) => {
        if (missions.length > 1) {
            const newMissions = missions.filter((_, i) => i !== index);
            setMissions(newMissions);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedImages([...selectedImages, ...Array.from(files)]);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {/* Main Content */}
            <div className="flex-1 px-4 pb-20 overflow-y-auto">
                {/* Header */}
                <div className="mt-4 mb-6">
                    <h1 className="text-2xl font-semibold text-white">괴담 생성하기</h1>
                </div>

                {/* AI Writing Toggle */}
                <div className={`w-full p-3 mb-4 flex items-center justify-between ${useAI ? 'bg-[#950000]' : 'bg-[#424242]'} rounded-[5px]`}>
                    <p className="text-white text-sm font-medium">AI로 작성하기</p>
                    <div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" onClick={() => setUseAI(!useAI)} />
                            <div className="
                                relative w-11 h-6 bg-gray-200
                                peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white-300
                                rounded-full peer
                                peer-checked:bg-white-600
                                after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                                after:border after:rounded-full after:h-5 after:w-5
                                after:transition-all
                                after:bg-[#424242] after:border-[#424242]
                                peer-checked:after:bg-[#950000] peer-checked:after:border-[#950000]
                                rtl:peer-checked:after:-translate-x-full peer-checked:after:translate-x-full
                            "></div>
                        </label>
                    </div>

                </div>
                <div className="flex">
                    <div className="w-[60px] h-[60px] bg-[#424242] rounded-[7px] flex items-center justify-center">
                        <Icon icon="Camera" size={30} color="#CFCFCF" />
                    </div>
                    <div>
                        {/* Title Input */}
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                className="w-full p-3 bg-transparent text-white placeholder-white text-lg rounded-[7px] border-none outline-none"
                            />
                        </div>

                        {/* Genre Selection */}
                        <div className="mb-6">
                            <div className="flex items-center space-x-2">
                                <select
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="px-3  bg-transparent text-[#CFCFCF] text-[12px] rounded-[7px] border-none outline-none"
                                >
                                    <option value="">장르 선택</option>
                                    <option value="horror">공포</option>
                                    <option value="mystery">미스터리</option>
                                    <option value="thriller">스릴러</option>
                                    <option value="supernatural">초자연</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Image Upload Section */}
                <div className="mb-6">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {selectedImages.slice(0, 9).map((image, index) => (
                            <div key={index} className="w-full h-48 bg-[#424242] rounded-[7px] border border-white/30 relative flex-shrink-0">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-full h-full object-cover rounded-[7px]"
                                />
                            </div>
                        ))}
                        {selectedImages.length < 9 && (
                            <label className="w-full h-48 bg-[#424242] rounded-[7px] border border-white/30 flex flex-col items-center justify-center cursor-pointer relative flex-shrink-0">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <div className="text-[#CFCFCF] text-2xl">
                                    <Icon icon="Camera" size={30} color="#CFCFCF" />
                                </div>

                                <div className="text-center mt-2">
                                    <span className="text-[#CFCFCF] text-xs">{selectedImages.length + 1}/10</span>
                                </div>
                            </label>
                        )}
                    </div>
                </div>

                {/* Audio Insertion */}
                <div className="mb-6">
                    <div className="w-full p-3 bg-[#950000] rounded-[5px] flex items-center justify-center space-x-2">
                        <Icon icon="Speaker" size={20} color="#fff" />
                        <span className="text-white text-base font-semibold">오디오 삽입</span>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-white mb-2">설명</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 bg-transparent text-white placeholder-white text-lg rounded-[7px] border border-white/30 outline-none resize-none"
                        rows={4}
                    />
                </div>

                {/* Mission Settings */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-lg font-semibold text-white">임무 설정</label>
                        <button
                            onClick={addMission}
                            className="text-[#BEBEBE] text-xs flex items-center space-x-1"
                        >
                            <span>임무 추가</span>
                            <span className="text-2xl font-light">+</span>
                        </button>
                    </div>

                    {missions.map((mission, index) => (
                        <div key={index} className="mb-3 flex items-center space-x-2">
                            <div className="w-8 h-8 bg-transparent rounded-[4px] border border-white/30 flex-shrink-0"></div>
                            <input
                                type="text"
                                value={mission}
                                onChange={(e) => updateMission(index, e.target.value)}
                                placeholder="임무를 입력해보세요"
                                className="flex-1 p-3 bg-transparent border border-white/30 text-white placeholder-[#BEBEBE] text-xs rounded-[4px] outline-none"
                            />
                            {missions.length > 1 && (
                                <button
                                    onClick={() => removeMission(index)}
                                    className="text-[#BEBEBE] text-lg font-light"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
                <div className="flex justify-around items-center py-2">
                    <div className="flex flex-col items-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#B0B0B0]">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                        <span className="text-[#B0B0B0] text-xs">홈</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#B0B0B0]">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                        <span className="text-[#B0B0B0] text-xs">검색</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span className="text-white text-xs">MY</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
