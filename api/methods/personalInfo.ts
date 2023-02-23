import {IUserPersonalInfoItem, IUserPersonalInfoList} from "../../interfaces/user";
import {IPublicUserData} from "../../interfaces/users";

export const changePersonalInfoItem =
    function (
        personalItem: IUserPersonalInfoItem|IUserPersonalInfoList<IPublicUserData<string>|string>,
        data: IUserPersonalInfoItem|IUserPersonalInfoList<string>
    ): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            personalItem.value = data.value || personalItem.value;
            personalItem.hidden = typeof data.hidden === "boolean" ? data.hidden : personalItem.hidden;
            resolve(true);
        })
    }
