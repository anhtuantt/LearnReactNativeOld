import { colors } from '@/features/system/theme/configs/colors';
import { removeVietnameseAccents } from '@/utils/helpers';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListRenderItem, TouchableOpacity, ViewStyle, VirtualizedList } from 'react-native';
import BottomSheetModal from '../BottomSheetModal';
import Box from '../Box';
import ButtonPrimary from '../Button/ButtonPrimary';
import CheckBox from '../CheckBox';
import Icons from '../Icons';
import TextInput from '../TextInput';
import Typography from '../Typography';

interface DropdownProps<T> {
  label: string;
  data: T[];
  placeholder?: string;
  defaultValue?: T;
  defaultValues?: T[];
  onSelectItem?: (item: T) => void;
  exactKey: string;
  renderButtonDropdown?: (item: T, close: () => void) => JSX.Element | undefined;
  labelField?: string;
  valueField?: string;
  searchable?: boolean;
  isMultipleSelect?: boolean;
  onSelectManyItems?: (item: T[]) => void;
  onSelectManyLastItems?: (item: T) => void;
  labelColor?: string;
  selectedLabel?: string;
  renderSelectedEndAdornment?: (item: T) => React.ReactNode;
  renderSelectedItemInDropdown?: (item: T, isSelected: boolean) => React.ReactNode;
  closeAfterSelect?: boolean;
  customRenderItems?: (item: T, index: number) => React.ReactNode;
  onAfterClose?: () => void;
  labelFontWeight?: string;
  highlightSelected?: boolean;
  isChangeSelect?: boolean;
  noDataText?: string;
  isDisabled?: boolean;
}

const Dropdown = function Dropdown<T>(props: DropdownProps<T>) {
  const { SearchCustomerIcon, ClearTextFieldIcon, CheckIcon, CloseIcon, ChevronBottomIcon } = Icons;
  const { t } = useTranslation();
  const {
    label,
    data,
    exactKey,
    placeholder,
    defaultValue,
    onSelectItem,
    onSelectManyItems,
    renderButtonDropdown,
    labelField = 'label',
    valueField = 'value',
    searchable = false,
    isMultipleSelect = false,
    labelColor = colors.text.main,
    selectedLabel,
    renderSelectedEndAdornment = () => <ChevronBottomIcon />,
    renderSelectedItemInDropdown,
    closeAfterSelect = true,
    customRenderItems,
    onAfterClose,
    onSelectManyLastItems,
    defaultValues,
    labelFontWeight = 500,
    highlightSelected = false,
    isChangeSelect = false,
    noDataText = 'No data found',
    isDisabled = false,
  } = props;

  const [isShowModal, setIsShowModal] = useState(false);
  const [textSearchInput, setTextSearchInput] = useState<string>('');
  const [searchData, setSearchData] = useState<T[]>();
  const [dropdownData, setDropdownData] = useState<T[]>();
  const [selectedValue, setSelectedValue] = useState<T>(defaultValue ?? ({} as T));
  const [selectedValues, setSelectedValues] = useState<T[]>();
  const handleSelectItem = (item: T) => {
    setSelectedValue(item);
    if (isMultipleSelect) {
      if (selectedValues && selectedValues.length > 0) {
        const itemIsSelected = selectedValues.find(
          value => value[valueField as keyof T] === item[valueField as keyof T],
        );
        if (itemIsSelected) {
          const newArrSelectedValue = selectedValues.filter(
            value => value[valueField as keyof T] !== item[valueField as keyof T],
          );
          setSelectedValues(newArrSelectedValue);
          if (onSelectManyItems) {
            onSelectManyItems(newArrSelectedValue);
          }
          onSelectManyLastItems && onSelectManyLastItems(item);
          return;
        }
      }
      setSelectedValues(prev => {
        if (prev && prev?.length > 0) return [...prev, item];
        return [item];
      });
      if (onSelectManyItems) {
        onSelectManyItems([...(selectedValues ?? []), item]);
      }
      onSelectManyLastItems && onSelectManyLastItems(item);
      return;
    } else {
      if (onSelectItem) {
        onSelectItem(item);
      }
    }
    closeAfterSelect && handleCloseModal();
  };

  useEffect(() => {
    setSelectedValue(defaultValue ?? ({} as T));
  }, [defaultValue]);

  useEffect(() => {
    setIsShowModal(false);
  }, [isChangeSelect]);

  useEffect(() => {
    if (defaultValues) {
      setSelectedValues(defaultValues ?? ([{}] as T[]));
    }
  }, [defaultValues]);

  // @ts-ignore
  const handleRenderItem: ListRenderItem<T> = ({ item, index }: { item: T; index: number }) => {
    if (customRenderItems) {
      return customRenderItems(item, index);
    }
    const isSelected = selectedValue && selectedValue[valueField as keyof T] === item[valueField as keyof T];
    return isMultipleSelect ? (
      <TouchableOpacity onPress={() => handleSelectItem(item)}>
        <Box width={'100%'} flexDirection='row' alignItems='center' borderRadius={16} paddingVertical={12}>
          <CheckBox
            borderRadius={6}
            onChange={() => handleSelectItem(item)}
            checked={
              selectedValues &&
              selectedValues?.length > 0 &&
              selectedValues.find(value => value[valueField as keyof T] === item[valueField as keyof T]) !== undefined
            }
            label={t(item[labelField as keyof T] as string)}
            borderWidth={1}>
            <Box padding={0} paddingLeft={12} justifyContent='center'>
              <Typography fontSize={16} fontWeight={'500'} color={colors.text.main}>
                {t(item[labelField as keyof T] as string)}
              </Typography>
            </Box>
          </CheckBox>
        </Box>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => handleSelectItem(item)}>
        {renderSelectedItemInDropdown ? (
          renderSelectedItemInDropdown(item, isSelected)
        ) : (
          <Box
            borderRadius={16}
            width={'100%'}
            flexDirection='row'
            paddingVertical={12}
            paddingHorizontal={highlightSelected ? 12 : 0}
            backgroundColor={highlightSelected && isSelected ? 'lightgray' : '#fff'}>
            <Box flex={1}>
              <Box flexDirection='row' gap={12} alignItems='center'>
                {item['icon' as keyof T] as JSX.Element}
                <Typography
                  fontSize={16}
                  fontWeight={'500'}
                  color={highlightSelected && isSelected ? colors.primary.main : colors.text.main}>
                  {t(item[labelField as keyof T] as string)}
                </Typography>
              </Box>
            </Box>
            {isSelected && (
              <Box>
                <CheckIcon
                  color={highlightSelected && isSelected ? colors.primary.main : colors.border.main}
                  width={20}
                  height={20}
                />
              </Box>
            )}
          </Box>
        )}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setDropdownData(data);
    if (customRenderItems) return;
    const arr = data.map(item => ({
      [labelField]: removeVietnameseAccents(t(item[labelField as keyof T] as string)),
      [valueField]: item[valueField as keyof T] as string,
    })) as T[];
    setSearchData(arr);
  }, [data]);

  function mapSearchDataToDropdown(dataMap?: T[]) {
    if (dataMap) {
      setDropdownData(
        data?.filter(item => {
          return dataMap?.some(searchItem => searchItem[valueField as keyof T] === item[valueField as keyof T]);
        }),
      );
    }
  }

  function handleSearch(search: string) {
    setTextSearchInput(search);
    const strSearch = removeVietnameseAccents(search);
    const searchResult = searchData?.filter(x => (x[labelField as keyof T] as string)?.includes(strSearch));
    mapSearchDataToDropdown(searchResult);
  }

  const handleCloseModal = () => {
    setIsShowModal(false);
    handleClearInputSearch();
    if (onAfterClose) onAfterClose();
  };

  const handleClearInputSearch = () => {
    setTextSearchInput('');
    setDropdownData(data);
  };

  const labelSelected = useMemo(() => {
    if (isMultipleSelect) {
      if (selectedValues && selectedValues.length > 0) {
        const labelMultiSelect = selectedValues.map(item => item[labelField as keyof T]);
        return labelMultiSelect.join(', ');
      }
    } else {
      if (
        selectedValue &&
        Object.hasOwnProperty.call(selectedValue, labelField) &&
        Object.hasOwnProperty.call(selectedValue, valueField)
      ) {
        return t(selectedValue[labelField as keyof T] as string);
      }
    }
    return defaultValue ? t(defaultValue[labelField as keyof T] as string) : placeholder ? placeholder : '';
  }, [selectedValue, selectedValues, placeholder]);

  return (
    <>
      <ButtonPrimary
        onPressCustom={() => !isDisabled && setIsShowModal(true)}
        title={selectedLabel ?? labelSelected}
        backgroundColor={'lightgray'}
        endAdornment={renderSelectedEndAdornment(selectedValue)}
        borderRadius={12}
        textColor={labelColor}
        fontSize={16}
        fontWeight={labelFontWeight}
        numberOfLines={1}
      />
      {isShowModal && (
        <BottomSheetModal isOpen={isShowModal} onCloseModal={handleCloseModal}>
          <Box flexDirection='row' justifyContent='space-between' alignItems='center' padding={16}>
            <Box>
              <Typography fontSize={20} fontWeight={'700'} color={colors.text.parisM}>
                {label}
              </Typography>
            </Box>
            <TouchableOpacity onPress={handleCloseModal}>
              <CloseIcon color={colors.primary.main} width={24} height={24} />
            </TouchableOpacity>
          </Box>
          {searchable && (
            <TextInput
              value={textSearchInput}
              onChangeText={handleSearch}
              maxLength={255}
              startIcon={<SearchCustomerIcon />}
              borderRadius={16}
              endIcon={
                <TouchableOpacity onPress={handleClearInputSearch}>
                  <ClearTextFieldIcon />
                </TouchableOpacity>
              }
              borderWidth={1}
              style={
                [
                  {
                    padding: 12,
                    borderColor: colors?.primary?.light,
                    elevation: 0,
                    backgroundColor: colors.primary.light,
                  },
                ] as ViewStyle
              }
            />
          )}
          <Box flexDirection='column'>
            {dropdownData && dropdownData?.length > 0 ? (
              <VirtualizedList<T>
                initialNumToRender={8}
                data={dropdownData}
                renderItem={handleRenderItem}
                getItemCount={data => data.length}
                getItem={(data, index) => data[index]}
                keyExtractor={(data, index) => `dropdown_${exactKey}_${data[valueField as keyof T] as string}_${index}`}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                windowSize={10}
              />
            ) : (
              <Box padding={16} alignItems='center'>
                <Typography>{noDataText}</Typography>
              </Box>
            )}
          </Box>
          {renderButtonDropdown && renderButtonDropdown(selectedValue, handleCloseModal)}
        </BottomSheetModal>
      )}
    </>
  );
};

export default React.memo(
  Dropdown,
  (prevProps, nextProps) =>
    prevProps.defaultValue === nextProps.defaultValue &&
    prevProps.defaultValues === nextProps.defaultValues &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.data === nextProps.data &&
    prevProps.isDisabled === nextProps.isDisabled,
);
