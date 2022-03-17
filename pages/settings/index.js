import Header from '../../components/header/Header';
import Footbar from '../../components/navbar/Footbar';
import {
    BasicSettingsCard,
    NotificationSettingsCard,
} from '../../components/settings/SettingCards';

const Settings = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-screen overflow-y-scroll bg-neutral-50">
            <Header />
            <Footbar />
            <div className="w-full px-6 md:px-10">
                <div className="mx-auto flex max-w-7xl flex-grow-0 flex-col gap-10 pt-20 md:pt-[136px]">
                    <div className="bg-white py-6">
                        <h1 className=" mx-6 text-2xl text-neutral-800 md:mx-16">
                            Speakup使用者設定調整
                        </h1>
                    </div>
                    <BasicSettingsCard
                        initValues={{
                            name: '櫻島麻衣',
                            username: 'sakura_mai',
                            birthday: '2004-12-02',
                            email: 'wakeup@reality.truth',
                        }}
                    />
                    <NotificationSettingsCard />
                </div>
            </div>

            <div className="h-40 flex-shrink-0"></div>
        </div>
    );
};

export default Settings;
