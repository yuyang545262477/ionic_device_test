import {PermissionTypes} from "../enums/permissiion.type";
import {Diagnostic} from "@ionic-native/diagnostic";
import {PermissionStatus} from "../enums/permission.status";
import {Injectable} from "@angular/core";

@Injectable()
export abstract class DeviceCommon {
    protected permission: string[];

    protected constructor(protected diagnostic: Diagnostic) {
    }

    ReadyPermission(): Promise<PermissionStatus> {
        return this.diagnostic.getPermissionsAuthorizationStatus(this.permission)
            .then((statesObj: { [key in keyof PermissionTypes]: PermissionStatus }) => {
                const definedKeys: string[] = Object.keys(statesObj).filter((key: keyof PermissionTypes) => {
                    return statesObj[key] !== PermissionStatus.GRANTED;
                });
                return definedKeys.length === 0 ? Promise.resolve(PermissionStatus.GRANTED) : Promise.reject(definedKeys);
            })
            .catch((definedKeys: PermissionTypes[]) => {
                return this.diagnostic.requestRuntimePermissions(definedKeys)
                    .then((statesObj: { [key in keyof PermissionTypes]: PermissionStatus }) => {
                        const definedKeys: string[] = Object.keys(statesObj).filter((key: keyof PermissionTypes) => {
                            return statesObj[key] !== PermissionStatus.GRANTED;
                        });
                        return definedKeys.length === 0 ? Promise.resolve(PermissionStatus.GRANTED) : Promise.reject(definedKeys);
                    });
            });
    }


}