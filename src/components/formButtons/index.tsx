'use client';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProgressContext } from '../progressProvider';

const FormButtons = () => {
  const { currentState, maxState, setCurrentState } =
    useContext(ProgressContext);

  return (
    <div className="flex justify-between">
      <Button
        onClick={() => {
          if (currentState === 0) return;
          setCurrentState(currentState - 1);
        }}
        disabled={currentState === 0}
        className="flex items-center gap-2"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>
      <Button
        disabled={currentState == maxState}
        onClick={() => {
          if (currentState === maxState) return;
          setCurrentState(currentState + 1);
        }}
        className="flex items-center gap-2"
      >
        {currentState === 2 ? 'Submit' : 'Next'}
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default FormButtons;
