import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Label from '../../../form/Label';
import Input from '../../../form/input/InputField';

function HighlightItem({ highlight, index, onRemove, onUpdate }) {
      return (
            <div className="flex items-center gap-2">
                  <div className='w-full'>
                        <Label htmlFor="inputOverviewTitle">Overview Title</Label>
                        <Input name='overview_title' type="text" id="inputOverviewTitle" placeholder="e.g., Tokyo's oldest Buddhist temple"/>
                  </div>
                  <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                        <CloseIcon fontSize="small" />
                  </button>
            </div>
      );
}

export default HighlightItem