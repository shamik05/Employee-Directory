import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// Mock the API module FIRST using jest.mock (not jest.doMock)
jest.mock('../utils/API', () => ({
  show: jest.fn(() => [{ 
    name: 'Test User', 
    email: 'test@example.com', 
    phone: '123', 
    dob: '2000-01-01', 
    image: '' 
  }]),
  search: jest.fn((query) => query ? [] : [{ name: 'Test User' }]),
  sorting: jest.fn(() => [{ name: 'Test User' }])
}))

// Mock child components
jest.mock('./Row', () => (props) => (
  <tr data-testid="mock-row">
    <td>{props.name}</td>
  </tr>
))

jest.mock('./Thead', () => ({ handleSort }) => (
  <thead>
    <tr>
      <th><button onClick={() => handleSort('name')}>Name</button></th>
      <th><button onClick={() => handleSort('email')}>Email</button></th>
    </tr>
  </thead>
))

// Now import the Table component AFTER setting up mocks
import Table from './Table'
import API from '../utils/API'

describe('Table Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('loads and displays initial data', () => {
    render(<Table />)
    
    expect(API.show).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  test('triggers search when typing in input', async () => {
    const user = userEvent.setup()
    render(<Table />)

    await user.type(screen.getByPlaceholderText('Search here'), 'test')
    
    expect(API.search).toHaveBeenCalledWith('test')
  })

  test('triggers sorting when header buttons are clicked', async () => {
    const user = userEvent.setup()
    render(<Table />)

    await user.click(screen.getByRole('button', { name: /name/i }))
    expect(API.sorting).toHaveBeenCalledWith('name', 'ASC')

    await user.click(screen.getByRole('button', { name: /name/i }))
    expect(API.sorting).toHaveBeenCalledWith('name', 'DSC')
  })

  test('updates search state when input changes', async () => {
    const user = userEvent.setup()
    render(<Table />)

    const input = screen.getByPlaceholderText('Search here')
    await user.type(input, 'hello')
    
    expect(input).toHaveValue('hello')
  })
})