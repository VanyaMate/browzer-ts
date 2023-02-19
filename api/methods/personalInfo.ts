import {IUserPersonalInfoItem, IUserPersonalInfoList} from "../../interfaces/user";
import {ResponseError} from "../../enums/responses";

export const changePersonalInfoItem =
    function (
        personalItem: IUserPersonalInfoItem|IUserPersonalInfoList<string>,
        data: IUserPersonalInfoItem|IUserPersonalInfoList<string>
    ): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            personalItem.value = data.value || personalItem.value;
            personalItem.hidden = typeof data.hidden === "boolean" ? data.hidden : personalItem.hidden;
            resolve(true);
        })
    }