import React from "react";
import { Stack, DatePicker, IStyle, IDatePickerStyles, IStyleFunctionOrObject, IDatePickerStyleProps, TextField } from "@fluentui/react";
import { DataRequirement } from "../../../../services/Clients/PolicyQueryClient";
import { FieldLabel } from "./fieldLabel";
import { FieldValidationMessage } from "./fieldValidationMessage";
import { FenXApi } from "../../../../services/axios/AxiosClient";
import { ISimpleFieldType } from "./simpleFieldType";
import { FieldStyles } from "../../../../styles/field";
import moment from "moment";

export class DateComponent extends React.Component<ISimpleFieldType> {
    state = { validationMessages: [] as string[], selectedDate: (this.props.metadata.defaultValue ? new Date(this.props.metadata.defaultValue as string) : undefined )}
    placeholder = "---";

    componentDidMount = () => {
        let value = this.props.data![this.props.metadata.dataField?.propertyName!] ?? this.props.metadata.defaultValue;

        if (value && this.props.onChange) {
            this.setState({ selectedDate: new Date(value) })

            this.props.onChange({
                key: this.props.metadata.dataField?.propertyName!,
                value: moment(value, "YYYY-MM-DD").format("YYYY-MM-DD"),
                type: "Single"
            });
        }
        
        this.validateChange(value, false);
    }

    onValueChange = (event: any) => {
        // validate change
        let newValue = event.target.textContent;
        if(this.props.fieldModifier) newValue = this.props.fieldModifier(newValue).value as string;
        this.validateChange(newValue, true);

        // convert date coming in from date picker to a moment
        let momentValue: moment.Moment = moment(newValue, "D-M-YYYY");
        
        // convert moment to string
        const stringValue: string = momentValue.format("YYYY-MM-DD");

        // set new date state
        this.setState({ selectedDate: new Date(stringValue) });
        
        // on change
        if (this.props.onChange) {
            this.props.onChange({
                key: this.props.metadata.dataField?.propertyName!,
                value: stringValue,
                type: "Single"
            });
        }
    }

    validateChange = (newValue: any, showValidationErrors: boolean = false) => {
        if (!this.props.onValidate) return;

        let isValid = true;
        var messages = [];
        if (this.props.metadata.validationRule?.validationData?.isMandatory?.active && (!newValue || newValue===this.placeholder)) {
            isValid = false;
            messages.push(this.props.metadata.validationRule?.validationData?.isMandatory?.message);
        }

        if (this.props.metadata.validationRule?.validationData?.noPastDates?.active && (moment(newValue, "D-M-YYYY").toDate().getTime() <= new Date().getTime())) {
            isValid = false;
            messages.push(this.props.metadata.validationRule?.validationData?.noPastDates?.message);
        }

        if (this.props.metadata.validationRule?.validationData?.noFutureDates?.active && (moment(newValue, "D-M-YYYY").toDate().getTime() > new Date().getTime())) {
            isValid = false;
            messages.push(this.props.metadata.validationRule?.validationData?.noFutureDates?.message);
        }

        if (this.props.metadata.validationRule?.validationData?.dateLimit?.active) {
            const value: number = moment(newValue, "D-M-YYYY").toDate().getTime();
            const minDate: number | null = this.props.metadata.validationRule?.validationData?.dateLimit?.minDate ? moment(this.props.metadata.validationRule.validationData.dateLimit.minDate).toDate().getTime() : null; 
            const maxDate: number | null = this.props.metadata.validationRule?.validationData?.dateLimit?.maxDate? moment(this.props.metadata.validationRule.validationData.dateLimit.maxDate).toDate().getTime() : null; 
            if ((maxDate && value > maxDate) || (minDate && value < minDate)) {
                isValid = false;
                messages.push(this.props.metadata.validationRule?.validationData?.dateLimit?.message);
            }
        }
        
        if(this.props.metadata.isReadOnly || this.props.isReadOnly) isValid=true;
        this.props.onValidate({
            field: this.props.metadata.dataField?.propertyName!,
            isValid: isValid
        });

        if (showValidationErrors) this.setState({ validationMessages: messages });
    }

    // format date picker format (D/M/YYYY)
    onFormatDate = (date?: Date): string => {
        return (!date || !date.getDate()) ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear());
    };

    getValue = () => {
        // if conditional value
        if (this.props.metadata.hasEvaluatedConditionalValue) {
            const conditionalValue = this.props.data![this.props.metadata.dataField?.propertyName!] ?? this.props.metadata.defaultValue;
            return { value: this.onFormatDate(new Date(conditionalValue)) }
        }
        // if read only
        if (this.props.isReadOnly || this.props.metadata.isReadOnly) {
            return { value: this.onFormatDate(this.state.selectedDate) }
        }
        // default
        return { value: this.state.selectedDate }
    }

    render() {
        const { validationMessages, selectedDate } = this.state;

        let dateFieldProps: any = this.getValue();
        
        return (
        <Stack horizontal>
            <Stack.Item>
                <FieldLabel metadata={this.props.metadata} isReadOnly={this.props.isReadOnly}></FieldLabel>
            </Stack.Item>
            <Stack.Item >
                <Stack >
                    <Stack.Item>
                        { (!(this.props.isReadOnly || this.props.metadata.isReadOnly)) ?
                            (<DatePicker
                                key={"DateField-" + this.props.metadata.id} 
                                id={"dt" + this.props.metadata.id}
                                showMonthPickerAsOverlay={true}
                                placeholder={this.placeholder}
                                styles={{ textField: FieldStyles(this.props.isReadOnly || this.props.metadata.isReadOnly) as IStyle }}
                                borderless
                                {...dateFieldProps}
                                onBlur={ this.onValueChange }
                                formatDate={ this.onFormatDate }
                            />) : (
                                <TextField id={"txt" + this.props.metadata.id} 
                                    required={this.props.metadata.validationRule?.validationData?.isMandatory?.active}
                                    placeholder={this.placeholder}
                                    borderless
                                    readOnly
                                    label={this.props.metadata.name}
                                    onRenderLabel= {() => (<></>)}
                                    styles={{ field: FieldStyles(true) as IStyle }}
                                    {...dateFieldProps}
                                    ></TextField>
                            )
                        }
                    </Stack.Item>
                    <Stack.Item>
                        <FieldValidationMessage key={"fvm-" + this.props.metadata.id} messages={validationMessages} />
                    </Stack.Item>
                </Stack>
            </Stack.Item>
        </Stack>
    )}
}