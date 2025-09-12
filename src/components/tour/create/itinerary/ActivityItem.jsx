import React, { useState } from 'react'
import IconSelector from './IconSelector';
import CloseIcon from '@mui/icons-material/Close';
import Label from '../../../form/Label';
import Input from '../../../form/input/InputField';
import TextArea from '../../../form/input/TextArea';

function ActivityItem({ activity, activityIndex, itineraryIndex, onRemove, onUpdate }) {
      const [selectedIcon, setSelectedIcon] = useState(activity.activity_icon || 'fa-map-marker-alt');

      const handleIconSelect = (iconClass) => {
            setSelectedIcon(iconClass);
            onUpdate(activityIndex, { ...activity, activity_icon: iconClass });
      };

      const handleInputChange = (field, value) => {
            onUpdate(activityIndex, { ...activity, [field]: value });
      };

      return (
            <div className="activity-item">
                  <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                              <IconSelector
                                    selectedIcon={selectedIcon}
                                    onIconSelect={handleIconSelect}
                                    activityIndex={activityIndex}
                                    itineraryIndex={itineraryIndex}
                              />

                              <div className="flex-1 space-y-3">
                                    <div>
                                          <Input name='title' type="text" id="overviewTitle" placeholder="e.g., Senso-ji Temple Visit"/>
                                    </div>
                                    <div>
                                          <TextArea
                                                // value={message}
                                                // onChange={(value) => setMessage(value)}
                                                rows={2}
                                                placeholder="Brief description of the activity..."
                                          />
                                    </div>
                              </div>
                              <button
                                    type="button"
                                    onClick={() => onRemove(activityIndex)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                    <CloseIcon fontSize="small" />
                              </button>
                        </div>
                  </div>
            </div>
      );
}

export default ActivityItem