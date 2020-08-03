import React from 'react'
import { MdSearch } from 'react-icons/md'
import { Form, Input } from 'reactstrap'
import { updateSearch } from '../store/search/action'
import { connect } from 'react-redux'

const SearchInput = ({ updateSearch }) => {
  return (
    <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-primary"
      />
      <Input
        type="search"
        className="cr-search-form__input"
        placeholder="Search ..."
        onChange={event => updateSearch(event.target.value)}
      />
    </Form>
  )
}

const mapStateToProps = state => ({
  value: state.searchData.value
})

export default connect(mapStateToProps, { updateSearch })(SearchInput)