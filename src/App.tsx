import React, { useState } from 'react';
import { ReactComponent as IconName } from './assets/images/Icons.svg';
import './App.css'; 
import summerImg from './assets/images/Group 34968.jpg';
import productDemo from './assets/images/Group 34980.jpg';
import annualReport from './assets/images/Group 34981.jpg';
import familyPhoto from './assets/images/Group 34982.jpg';
import tutorialPhoto from './assets/images/Group 34983.jpg';
import naturePhoto from './assets/images/Group 34984.jpg';
import corporatePhoto from './assets/images/Group 34985.jpg';
import cityPhoto from './assets/images/Group 34986.jpg';
import architecturePhoto from './assets/images/download8.jpeg';
import landscapePhoto from './assets/images/download9.jpeg';

// Define types for the collection
interface Collection {
  id: number;
  title: string;
  type: 'Videos' | 'Photos' | 'Documents';
  thumbnail: string;
  itemCount: number;
}

const initialCollections: Collection[] = [
  { id: 1, title: 'Collection 1', type: 'Photos', thumbnail: summerImg, itemCount: 42 },
  { id: 2, title: 'Collection 2', type: 'Videos', thumbnail: productDemo, itemCount: 23 },
  { id: 3, title: 'Collection 3', type: 'Documents', thumbnail: annualReport, itemCount: 1 },
  { id: 4, title: 'Collection 4', type: 'Photos', thumbnail: familyPhoto, itemCount: 15 },
  { id: 5, title: 'Collection 5', type: 'Videos', thumbnail: tutorialPhoto, itemCount: 8 },
  { id: 6, title: 'Collection 6', type: 'Photos', thumbnail: naturePhoto, itemCount: 22 },
  { id: 7, title: 'Collection 7', type: 'Videos', thumbnail: corporatePhoto, itemCount: 3 },
  { id: 8, title: 'Collection 8', type: 'Videos', thumbnail: cityPhoto, itemCount: 21 },
  { id: 9, title: 'Collection 9', type: 'Photos', thumbnail: architecturePhoto, itemCount: 31 },
  { id: 10, title: 'Collection 10', type: 'Videos', thumbnail: landscapePhoto, itemCount: 11 },
];

const App: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [filter, setFilter] = useState<'All Files' | 'Videos' | 'Photos' | 'Documents'>('All Files');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState('');

  // Filter and search logic
  const filteredCollections = collections.filter((collection) => {
    return (
      (filter === 'All Files' || collection.type === filter) &&
      (collection.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '')
    );
  });

  // Split collections into rows
  const firstRow = filteredCollections.slice(0, 5);
  const secondRow = filteredCollections.slice(5, 10);

  // Handler to start editing a collection title
  const handleEditClick = (id: number, currentTitle: string) => {
    setEditingId(id);
    setNewTitle(currentTitle);
  };

  // Handler for saving the new collection title
  const handleSaveTitle = (id: number) => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === id ? { ...collection, title: newTitle } : collection
      )
    );
    setEditingId(null);
    setNewTitle('');
  };

  return (
    <div className="app">
      <h1>Collections</h1>
      <h3>Personalized Content Storyboards</h3>
      <div className="filter-buttons">
  {['All Files', 'Videos', 'Photos', 'Documents'].map((type) => (
    <button
      key={type}
      className={filter === type ? 'active' : ''}
      onClick={() => setFilter(type as 'All Files' | 'Videos' | 'Photos' | 'Documents')}
    >
      {type}
    </button>
  ))}
  <div className="search-bar-container">
    <IconName className="search-icon" />
    <input
      type="text"
      placeholder="Type here to search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-bar"
    />
  </div>
</div>
     <div className="collections">
        <div className="collection-row">
          {firstRow.map((collection) => (
            <div key={collection.id} className="collection-item">
              <img src={collection.thumbnail} alt={collection.title} className="thumbnail" />
              {editingId === collection.id ? (
                 <div className="edit-input">
                 <input
                   type="text"
                   value={newTitle}
                   onChange={(e) => setNewTitle(e.target.value)}
                 />
                 <button onClick={() => handleSaveTitle(collection.id)}>Save</button>
                 <button onClick={() => setEditingId(null)} className="cancel-button">Cancel</button>
               </div>
              ) : (
                <h3 onClick={() => handleEditClick(collection.id, collection.title)}>{collection.title}</h3>
              )}
              <p>
              {collection.type === 'Photos' ? `${collection.itemCount} Photos` : 
              collection.type === 'Videos' ? `${collection.itemCount} Videos` : 
              collection.type === 'Documents' ? `${collection.itemCount} Documents` : 
              `Items: ${collection.itemCount}`}
              </p>
            </div>
          ))}
        </div>
        <div className="collection-row">
          {secondRow.map((collection) => (
            <div key={collection.id} className="collection-item">
              <img src={collection.thumbnail} alt={collection.title} className="thumbnail" />
              {editingId === collection.id ? (
                <div className="edit-input">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <button onClick={() => handleSaveTitle(collection.id)}>Save</button>
                </div>
              ) : (
                <h3 onClick={() => handleEditClick(collection.id, collection.title)}>{collection.title}</h3>
              )}
              <p>
              {collection.type === 'Photos' ? `${collection.itemCount} Photos` : 
              collection.type === 'Videos' ? `${collection.itemCount} Videos` : 
              collection.type === 'Documents' ? `${collection.itemCount} Documents` : 
              `Items: ${collection.itemCount}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
