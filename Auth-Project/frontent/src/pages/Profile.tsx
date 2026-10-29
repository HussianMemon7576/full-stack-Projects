
import Swal from "sweetalert2";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileActions from "../components/profile/ProfileActions";

import {
  getCooldownRemaining,
  startSecurityCooldown,
  formatCooldownTime,
} from "../utils/securityCooldown";
import { changePasswordMutation, chnageUserNameQuery, profileQuery } from "../hooks/auth.hooks";



const Profile = () => {
  const {data,isError,isPending} = profileQuery()
  const changeUserNameMutation = chnageUserNameQuery()
const changePasswordMutations = changePasswordMutation()
  const user = data?.data
const isUpdatingAllowed = async(action : "username"|"password") : Promise<boolean> => {
  const checked = getCooldownRemaining(action)
  if(checked<=0){
    return true
  }

    await Swal.fire({
      icon: "warning",
      title: "Please wait",
      text: `You can change your username or password again after ${formatCooldownTime(checked)}.`,
      confirmButtonText: "OK",
    });

    return false;

}

const handleUserNameChnage = async(newUsername:string) => {
  const isCheckedAllowed  = await  isUpdatingAllowed("username")
  if(!isCheckedAllowed){
     throw new Error("Cooldown is active");
     
  }

   try {
      await changeUserNameMutation.mutateAsync(newUsername);

      startSecurityCooldown("username");

      await Swal.fire({
        icon: "success",
        title: "Username Updated",
        text: "Your username has been changed successfully.",
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Cooldown is active") {
        throw error;
      }

      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Your username could not be changed. Please try again.",
      });

      throw error;
    }
}

  const handlePasswordChange = async (
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    const allowed = await isUpdatingAllowed("password");

    if (!allowed) {
      throw new Error("Cooldown is active");
    }

    try {
      await changePasswordMutations.mutateAsync({
        oldPassword,
        newPassword,
      });

      startSecurityCooldown("password");

      await Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been changed successfully.",
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Cooldown is active") {
        throw error;
      }

      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Your password could not be changed. Please check your current password and try again.",
      });

      throw error;
    }
  }


  if (isPending) {
    return (
      <div className="p-6 text-gray-600">
        Loading profile...
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="p-6 text-red-600">
        Unable to load profile.
      </div>
    );
  }

  return (
      <main className="mx-auto w-full max-w-3xl p-4 sm:p-6">
      <ProfileHeader />

      <ProfileInfo
        username={user.username}
        email={user.email}
      />

      <ProfileActions
        username={user.username}
        onChangeUsername={handleUserNameChnage}
        onChangePassword={handlePasswordChange}
      />
    </main>
  )
}

export default Profile

