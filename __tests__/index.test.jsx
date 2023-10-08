import Home from '@/app/Home';
import { render, screen } from '@testing-library/react';

describe('Home Page - Rendering', () => { 
    it('should have home page text', () => {
        render(<Home />);
        screen.getAllByText('Romantic Comedy');
    });
 });
 

 // describe('hello', () => { 
//     it('hello', () => {

//     })
//  })
 