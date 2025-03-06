import {React, useState, useEffect, useRef} from 'react';
import './query-pages.css';
import QueryFooter from '../footer/QueryFooter';
import ProgressBar from '../progressbar/ProgressBar';
import useDogModel from './dogModel';

function DogBreedPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const { dogDataModel, loading: dogModelLoading, error, fetchDogData, saveDogData } = useDogModel();
  const [dogData, setDogData] = useState(dogDataModel || null);
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchBreeds = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://ec2-18-117-254-10.us-east-2.compute.amazonaws.com:8081/mer/customer/get/all_breed');
      const responseObject = await response.json();
      setBreeds(responseObject?.data);
      setFilteredBreeds(responseObject?.data);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  const handleBreedChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setFilteredBreeds(
      breeds.filter((breed) =>
        breed.breedName.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    );
  };

  const handleBreedSelect = (selectedBreed) => {
    setDogData({...dogData, breedId: selectedBreed?.breedId, breedName: selectedBreed?.breedName});
    setSearchTerm(selectedBreed?.breedName);
    setFilteredBreeds(
      breeds.filter((breed) =>
        breed.breedName.toLowerCase().startsWith(selectedBreed?.breedName.toLowerCase())
      )
    );
    setDropdownVisible(false);
    console.log(dogData);
  };

  const saveBreedChange = (dogData) => {
    saveDogData(dogData);
  };

  const toggleDropdownVisibility = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="query-page">
      {pageLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='query-container'>
          <ProgressBar progress={9} />
          <h1>What kind of dog is {dogDataModel?.name}?</h1>
          <p>Many dogs are a unique blend of breeds, but a rough idea is still helpful. We use breed information to estimate your dog’s appropriate size and weight. That way, our nutritionists can recommend the right caloric intake.</p>

          {loading ? (
            <div>Loading breeds...</div>
          ) : (
            <div className="breed-select-container" ref={dropdownRef}>
              <input
                type="text"
                className="breed-input"
                placeholder="Search for a breed..."
                value={searchTerm}
                onChange={handleBreedChange}
                onClick={toggleDropdownVisibility}
              />
              <button className="breed-dropdown-button" onClick={toggleDropdownVisibility}>▼</button>
              {dropdownVisible && (
                <ul className="breed-dropdown">
                  {filteredBreeds.map((breed) => (
                    <li key={breed.breedId} onClick={() => handleBreedSelect(breed)}>
                      {breed.breedName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <QueryFooter saveDogData={saveBreedChange} dogData={dogData} back={"/dog-age-form"} next={"/dog-gender-form"} />
        </div>
      )}
    </div>
  );
}

export default DogBreedPage;
