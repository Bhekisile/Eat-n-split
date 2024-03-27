import PropTypes from 'prop-types';
import { useState } from 'react';

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
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const handleShowAddFriend = () => {
    setShowAddFriend((show) => !show);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

FriendsList.propTypes = {
  friends: PropTypes.objectOf(PropTypes.checkPropTypes()).isRequired,
};

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
  friend: PropTypes.objectOf(PropTypes.checkPropTypes()).isRequired,
};

function Button({ children, onClick }) {
  return <button type="submit" className="button" onClick={onClick}>{children}</button>;
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

/* eslint-disable */
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48?u=933372');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48?u=933372');
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="friend-name">🧑‍🤝‍🧑Friend name</label>
      <input id="friend-name" type="text" onChange={(e) => setName(e.target.value)} />

      <label htmlFor="image-url">🌄 Image URL</label>
      <input id="image-url" type="text" onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>

    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🕴️ Your expense</label>
      <input type="text" />

      <label>🧑‍🤝‍🧑 X&apos;s expense</label>
      <input type="text" disabled />

      <label>🧑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

export default App;
