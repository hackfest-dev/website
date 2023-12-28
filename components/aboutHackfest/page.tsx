import { BorderedContainer } from "../ui/page";
import { GiDiamonds } from "react-icons/gi";
const AboutHackfest = () => {
    return (
        <>
            <div className="grid grid-rows-6 lg:grid-cols-1 lg:min-h-screen p-12 transition-all">
                <div className="flex items-center justify-center lg:justify-start row-span-1">
                    <h1 className="text-5xl text-center font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">
                        About Hackfest
                    </h1>
                </div>
                <div className="grid row-span-5 lg:grid-cols-10 gap-4">
                    <div className="grid grid-rows-2 lg:col-span-3 h-full">
                        <BorderedContainer className="p-5 w-full grid grid-cols-12 h-full rounded-3xl">
                            <div className="col-span-11 flex flex-col justify-center items-center">
                                <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">
                                    &nbsp;APRIL
                                </h1>
                                <p className="flex items-center text-lg font-semibold">
                                    5th&nbsp;
                                    <GiDiamonds />
                                    &nbsp;6th&nbsp;
                                    <GiDiamonds />
                                    &nbsp;7th
                                </p>
                            </div>
                            <div className="col-span-1 flex flex-col items-center justify-center font-bold text-xl bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">
                                <span>2</span>
                                <span>0</span>
                                <span>2</span>
                                <span>4</span>
                            </div>
                        </BorderedContainer>
                        <BorderedContainer className="w-full flex flex-col justify-start p-8 px-12 space-y-4 rounded-3xl">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">
                                5 Tracks
                            </h1>
                            <p className="text-xl lg:text-lg xl:text-xl text-left">
                                Five diverse tracks, to craft and code solutions
                                for thier choosen problem statement.
                            </p>
                        </BorderedContainer>
                    </div>

                    <div className="grid lg:grid-cols-2 lg:col-span-7 lg:gap-4 border border-gray-200 rounded-3xl p-4 gap-12">
                        <div className="border h-96 lg:h-full border-gray-200 rounded-3xl text-4xl font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1373.438488755297!2d74.93394613391527!3d13.18315229620338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb56415ad85e5b%3A0x10b77ac6f6afc7fa!2sN.M.A.M.%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1703326880578!5m2!1sen!2sin"
                                className="border-0 h-full w-full rounded-3xl"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        <div className="grid grid-rows-11 gap-4 h-screen lg:h-full">
                            <BorderedContainer className="w-full flex items-center justify-center rounded-3xl p-4 py-6 text-2xl  xl:text-3xl text-center font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent">
                                3 Day Long Tech-Fest
                            </BorderedContainer>
                            <BorderedContainer className="w-full flex flex-col row-span-4  rounded-3xl text-7xl text-center font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4 justify-center items-center">
                                <span className="text-2xl">
                                    <span className="text-7xl">50</span>
                                    <sup>Hrs</sup>
                                </span>
                                <span className="text-3xl lg:text-2xl flex items-center justify-center">
                                    On-site Event
                                </span>
                            </BorderedContainer>
                            <BorderedContainer className="w-full flex flex-col row-span-4 rounded-3xl text-7xl text-center font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent p-4 justify-center items-center">
                                <span className="text-2xl">
                                    <span className="text-7xl">36</span>
                                    <sup>Hrs</sup>
                                </span>
                                <span className="text-3xl lg:text-2xl flex items-center justify-center">
                                    Intense Hackathon
                                </span>
                            </BorderedContainer>
                            <div className="flex flex-col items-center justify-center row-span-1 text-lg text-center font-bold bg-gradient-to-r from-primary-300 to-secondary-500 bg-clip-text text-transparent xl:text-xl">
                                <h1>NMAM Institute of Technology, Nitte</h1>
                                <p className="text-lg xl:text-xl">
                                    Karkala, Udupi District, Karnataka
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutHackfest;
