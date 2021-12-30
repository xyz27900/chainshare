import React from 'react';
import { Text } from '@/components/Text';
import { classname } from '@/utils/string';

type FileInputProps = {
  file: File | null;
  accept?: string[];
  disabled?: boolean;
  onChange?: (file: File) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ file, accept, disabled = false, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputFiles = e.target.files;
    if (!inputFiles) {
      return;
    }

    const inputFile = inputFiles.item(0);
    if (!inputFile) {
      return;
    }

    onChange && onChange(inputFile);
  };

  return <label
    className={
      classname(
        'block',
        'w-full',
        'rounded-lg',
        'cursor-pointer',
        'select-none',
        file ? 'bg-gray-6' : 'bg-blue',
        disabled && 'pointer-events-none'
      )
    }
  >
    <div className="py-3">
      <Text
        type={'headline'}
        color={file ? 'blue' : 'white'}
        align={'center'}
        strong
      >
        { file ? 'Change' : 'Add file' }
      </Text>
    </div>
    <input
      type="file"
      accept={accept?.join(',')}
      className="hidden"
      onChange={handleChange}
    />
  </label>;
};
