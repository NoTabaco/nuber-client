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
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;
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
      onCompleted={(data) => updateFields(data)}
    >
      {() => (
        <Mutation<updateProfile, updateProfileVariables>
          mutation={UPDATE_PROFILE}
          refetchQueries={[{ query: USER_PROFILE }]}
          awaitRefetchQueries={true}
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
