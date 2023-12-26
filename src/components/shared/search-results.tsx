import { Models } from 'appwrite';
import Loader from './loader';
import GridPostList from './grid-post-list';

interface SearchResultsProps {
  searchedPosts: Models.Document[];
  isSearchFetching: boolean;
}

const SearchResults = ({
  searchedPosts,
  isSearchFetching,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <div className='text-light-4 mt-10 text-center w-full'>
      No results found
    </div>
  );
};

export default SearchResults;
