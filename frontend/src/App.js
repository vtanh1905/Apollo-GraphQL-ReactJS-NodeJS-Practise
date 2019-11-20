import React, { useRef } from 'react';

import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USERS = gql`
  query {
    users {
      name
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      _id
      name
    }
  }
`;

const SUB_USER = gql`
  subscription {
    subUsers {
      _id
      name
    }
  }
`;

const App = () => {
  const refName = useRef(null);
  const { loading, error, data: dataUser, refetch: refetchUsers } = useQuery(
    GET_USERS
  );
  const [addUser] = useMutation(ADD_USER);
  const { data: subDataUser, loading: loading_sub_user } = useSubscription(
    SUB_USER
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleAddUser = () => {
    addUser({ variables: { input: { name: refName.current.value } } })
      .then(() => {
        refName.current.value = '';
        refetchUsers();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>List User</h1>
      <ul>
        {dataUser.users.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
      <form>
        <label>Name: </label>
        <input ref={refName} type="text" />
        <button type="button" onClick={handleAddUser}>
          Add
        </button>
      </form>
      {!loading_sub_user && <h1>New user : {subDataUser.subUsers.name}</h1>}
    </>
  );
};

export default App;
