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
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowAddFriend = () => {
    setShowAddFriend((show) => !show);
  };

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  };

  const handleSelection = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  };

  const handleSplitBill = (value) => {
    setFriends(
      (friends) => friends.map(
        (friend) => (friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value } : friend),
      ),
    );
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>

      {selectedFriend && (
      <FormSplitBill
        selectedFriend={selectedFriend}
        onSplitBill={handleSplitBill}
      />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

FriendsList.propTypes = {
  friends: PropTypes.objectOf(PropTypes.checkPropTypes()).isRequired,
  onSelection: PropTypes.func.isRequired,
  selectedFriend: PropTypes.objectOf(PropTypes.checkPropTypes()).isRequired,
};

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
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

      <Button onClick={() => onSelection(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
    </li>
  );
}

Friend.propTypes = {
  friend: PropTypes.objectOf(PropTypes.checkPropTypes()).isRequired,
  onSelection: PropTypes.func.isRequired,
  selectedFriend: PropTypes.objectOf(PropTypes.checkPropTypes()).isRequired,
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
      <input id="friend-name" name="friend-name" type="text" onChange={(e) => setName(e.target.value)} />

      <label htmlFor="image-url">🌄 Image URL</label>
      <input id="image-url" name="image-url" type="text" onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>

    </form>
  );
}

FormAddFriend.propTypes = {
  onAddFriend: PropTypes.func.isRequired,
};

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : '';
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label htmlFor="bill-value">💰 Bill value</label>
      <input
        id="bill-value"
        type="text" 
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label htmlFor="your-expense">🕴️ Your expense</label>
      <input
        type="text"
        id="your-expense"
        value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))}
      />

      <label htmlFor="friend-expense">🧑‍🤝‍🧑 {selectedFriend.name}&apos;s expense</label>
      <input type="text" id="friend-expense" disabled value={paidByFriend} />

      <label htmlFor="bill-option">🧑 Who is paying the bill</label>
      <select
        id="bill-option"
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

FormSplitBill.propTypes = {
  selectedFriend: PropTypes.objectOf(PropTypes.checkPropTypes()).isRequired,
  onSplitBill: PropTypes.func.isRequired,
}

export default App;
