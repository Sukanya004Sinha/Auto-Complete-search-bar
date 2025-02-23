import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
// Test case : renders AutoComplete Search Bar
test('renders AutoComplete Search Bar heading',() => {
  render(<App />);
  const headingElement = screen.getByText(/Autocomplete Search Bar/i);
  expect(headingElement).toBeInTheDocument();

});

// Test case: input field updates on change
test ('input fields updates on change',()=> {
  render(<App />);
  const inputElement = screen.getByRole('combobox');
  fireEvent.change(inputElement, {target: {value: 'Mango'}});
  expect(inputElement.value).toBe('Mango');
});
//Test case : shows result on focus and hides on blur 
test('shows result on focus and hides on blur', async () => {
  render(<App />);
  const inputElement = screen.getByRole('combobox');
  //Focus on input to show results 
  fireEvent.focus(inputElement)
  expect(screen.getByRole('listbox')).toBeInTheDocument();
  //blur input to hide results
  fireEvent.blur(inputElement);
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
});

