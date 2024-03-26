import PropTypes from 'prop-types';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
      </div>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
      <p className="red">
        You owe
        {' '}
        {friend.name}
        {' '}
        {Math.abs(friend.balance)}
        {' '}
        €
      </p>
      )}
      {friend.balance > 0 && (
      <p className="green">
        {friend.name}
        {' '}
        owes you
        {Math.abs(friend.balance)}
        {' '}
        €
      </p>
      )}
      {friend.balance === 0 && (
      <p>
        You and
        {' '}
        {friend.name}
        {' '}
        are even
      </p>
      )}

      <Button>Select</Button>
    </li>
  );
}

Friend.propTypes = {
  friend: PropTypes.string.isRequired,
};

function Button({ children }) {
  return <button type="button" className="button">{children}</button>;
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

/* eslint-disable */
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label htmlFor="friend-name">🧑‍🤝‍🧑Friend name</label>
      <input id="friend-name" type="text" />

      <label htmlFor="image-url">🌄 Image URL</label>
      <input id="image-url" type="text" />

      <Button>Add</Button>

    </form>
  );
}

export default App;
