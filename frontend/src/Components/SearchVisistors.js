import React, { useEffect, useState } from 'react'
import { UseAuthorizationContext } from '../hooks/UseAuthorizationContext';
import { UseVisitorContext } from '../hooks/UseVisitorContext';

const SearchVisistors = () => {

    const [searchData, setSearchData] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const {user} = UseAuthorizationContext();
    const {dispatch} = UseVisitorContext();

    const handleSearch = async() => {

        setIsSearching(true);
        setSearchError(null);

        let link = `${process.env.RENDER_URL}/api/visitors`;

        if(searchData.trim()){
            link=`${process.env.RENDER_URL}/api/visitors/search?searchedVis=${searchData}`
        }

        const response = await fetch(link, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok){
            setIsSearching(false);
            setSearchError(json.error);
        }

        if(response.ok){
            setIsSearching(false);
            setSearchError(null);
            dispatch({type: "GET", payload: json});
        }
    }

    useEffect(()=>{
        const CheckSearch = setTimeout(handleSearch, 500);
        return () => clearTimeout(CheckSearch);
    },[searchData]);

  return (
    <div>
        {searchError && (<div className='error'>{searchError}</div>)}
        <input type='text' placeholder='Search Visitors....' onChange={(e)=>setSearchData(e.target.value)} value={searchData} disabled={isSearching}/>
        <i className="bi bi-search"></i>
    </div>
  )
}

export default SearchVisistors