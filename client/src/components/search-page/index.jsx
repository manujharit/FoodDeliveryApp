import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchSearchSuggestions } from '@/utils/fetchData';
import RestaurantCard from '@/components/restaurant-card';
import Loading from '@/components/loading';
import WhatsOnMindCard from '@/components/whats-on-mind-card';
import Carousal from '@/components/carousel';
import useRestaurantData from '@/hooks/useRestaurantData';
import './_search-page.scss';

const SearchPage = () => {
  const resData = useRestaurantData();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { lat, lng } = useSelector((state) => state.location.coords);

  const handleQueryChange = (e) => {
    const val = e.target.value;

    setQuery(val);

    if (val.trim()) {
      setIsLoading(true);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const fetchResults = async () => {
      const data = await fetchSearchSuggestions(lat, lng, query);

      if (data?.data?.suggestions) {
        setResults(data.data.suggestions);
      } else {
        setResults([]);
      }

      setIsLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      if (lat && lng) {
        fetchResults();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, lat, lng]);

  const mapToRestaurantCard = (suggestion, index) => {
    let metadataObj = {};

    try {
      if (suggestion.metadata) {
        metadataObj = JSON.parse(suggestion.metadata);
      }
    } catch {
      // Ignore parse errors
    }

    return {
      id: metadataObj?.data?.primaryRestaurantId || suggestion.restaurantId || `fallback-id-${index}`,
      cloudinaryImageId: suggestion.cloudinaryId,
      name: suggestion.text,
      areaName: suggestion.tagToDisplay || '',
    };
  };

  return (
    <div className="search-page">
      <div className="search-page__header">
        <div className="search-page__input-wrapper">
          <input
            type="text"
            className="search-page__input"
            placeholder="Search for restaurants and food"
            value={query}
            onChange={handleQueryChange}
            autoFocus
          />
          <button className="search-page__btn">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="search-page__results">
          {results.length > 0 ? (
            results.map((suggestion, index) => (
              <RestaurantCard key={index} data={mapToRestaurantCard(suggestion, index)} />
            ))
          ) : query ? (
            <div className="search-page__no-results">No results found for &quot;{query}&quot;</div>
          ) : (
            <div className="search-page__default-view">
              {resData && resData['whats_on_your_mind'] && (
                <Carousal
                  cardTitle={''}
                  data={resData['whats_on_your_mind']}
                  card={({ data }) => <WhatsOnMindCard data={data} isSmall={true} />}
                  index={2}
                  scrollIndex={1}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
