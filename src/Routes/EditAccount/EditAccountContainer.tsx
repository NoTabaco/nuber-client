import axios from "axios";
import { useState } from "react";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import { USER_PROFILE } from "../../sharedQueries";
import {
  updateProfile,
  updateProfileVariables,
  userProfile,
} from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";

const EditAccountContainer: React.FC = () => {
  const [editAccountState, setEditAccountState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: "",
    uploading: false,
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const {
      target: { name, value, files },
    } = event;
    if (files) {
      setEditAccountState({ ...editAccountState, uploading: true });
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "922467424152646");
      formData.append("upload_preset", "dr8b69ok");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url },
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtldyq5kj/image/upload",
        formData
      );
      if (secure_url) {
        setEditAccountState({
          ...editAccountState,
          uploading: false,
          profilePhoto: secure_url,
        });
      }
    }

    if (name === "firstName") {
      setEditAccountState({ ...editAccountState, firstName: value });
    } else if (name === "lastName") {
      setEditAccountState({ ...editAccountState, lastName: value });
    } else if (name === "email") {
      setEditAccountState({ ...editAccountState, email: value });
    }
  };

  const updateFields = (data: userProfile) => {
    const {
      GetMyProfile: { user },
    } = data;
    if (user) {
      const { firstName, lastName, email, profilePhoto } = user;
      setEditAccountState({ firstName, lastName, email, profilePhoto } as any);
    }
  };

  return (
    <Query<userProfile>
      query={USER_PROFILE}
      fetchPolicy={"cache-and-network"}
      onCompleted={(data) => updateFields(data)}
    >
      {() => (
        <Mutation<updateProfile, updateProfileVariables>
          mutation={UPDATE_PROFILE}
          awaitRefetchQueries={true}
          refetchQueries={[{ query: USER_PROFILE }]}
          onCompleted={(data) => {
            const { UpdateMyProfile } = data;
            if (UpdateMyProfile.ok) {
              toast.success("Profile updated!");
            } else if (UpdateMyProfile.error) {
              toast.error(UpdateMyProfile.error);
            }
          }}
          variables={{ ...editAccountState }}
        >
          {(updateProfileFn, { loading }) => (
            <EditAccountPresenter
              {...editAccountState}
              onInputChange={onInputChange}
              loading={loading}
              onSubmit={updateProfileFn}
            />
          )}
        </Mutation>
      )}
    </Query>
  );
};

export default EditAccountContainer;
