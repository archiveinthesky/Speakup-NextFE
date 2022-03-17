import Header from '../../components/header/Header';
import Footbar from '../../components/navbar/Footbar';
import {
    BasicSettingsCard,
    NotificationSettingsCard,
} from '../../components/settings/SettingCards';

const Settings = () => {
    return (
        <div className="h-screen w-screen overflow-y-scroll bg-neutral-50">
            <Header />
            <Footbar />
            <div className="mx-auto flex max-w-7xl flex-col gap-10 pt-[136px]">
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
            <div className=" h-40"></div>
        </div>
    );
};

export default Settings;
