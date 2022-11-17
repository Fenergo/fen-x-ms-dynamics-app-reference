import { Stack, Alignment, DetailsList, SelectionMode, createTheme, CustomizerContext, IconButton } from "@fluentui/react";
import { Dictionary } from "@reduxjs/toolkit";
import * as React from "react";
import { DataRequirement, Requirement, VersionedJurisdictionDto } from "../../services/Clients/PolicyQueryClient";
import { LoadingSpinner } from "../loader/loader";
import { IFieldValidation } from "./field/data/simpleFieldType";
import { Field, FieldChangeEvent } from "./field/field";
import { ScreenHeading } from "./heading/ScreenHeading";
import { FenXApi } from "../../services/axios/AxiosClient";
import _, { initial } from "lodash";

export interface ISection extends React.PropsWithChildren {
  title?: string;
  alignChildren?: "auto" | "stretch" | "baseline" | "start" | "center" | "end";
  horizontalAlign?: Alignment;
  metadata?: DataRequirement[];
  onFieldUpdate?: (event: FieldChangeEvent) => void;
  initialData?: Dictionary<any>;
  onFieldValidate?: (event: IFieldValidation) => void;
  isLoading?: boolean;
  isReadOnly?: boolean;
  isCollapsible?: boolean;
  evaluatedData: Dictionary<any>;
  fieldModifiers?: Dictionary<(value: any) => any>;
  handleFieldPermission?: (apiCall: Promise<any>) => Promise<any>
}

// screen component
export class Section extends React.Component<ISection> {
  state = { isCollapsed: false, data: {} as Dictionary<any> };
  static counter = 1;
  fenXClient = FenXApi.getInstance();

  screenId = "Section-" + (this.props.metadata?.length ? this.props.metadata[0].id : (Section.counter++).toString());
  alignChildren = this.props.alignChildren;
  horizontalAlign = this.props.horizontalAlign;

  toggleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  }

  onFieldUpdate = (e: FieldChangeEvent) => {
    const { data } = this.state;
    data[e.key] = e.value ?? e.collections;
    this.setState({ data });
    if (this.props.onFieldUpdate) this.props.onFieldUpdate(e);
  }

  render = () => {
    const { isCollapsed, data } = this.state;
    let currentData = _.cloneDeep(this.props.initialData ?? {});
    for (var key in data) { currentData[key] = data[key]; }
    for (var key in this.props.evaluatedData) { currentData[key] = this.props.evaluatedData[key]; }

    if (this.props.isLoading) {
      return (
        <Stack key={"SectionLoaderStack" + this.screenId} verticalFill={true} verticalAlign="center" horizontalAlign="center">
          <Stack.Item key={"SectionStackItem" + this.screenId} align="center">
            <span><LoadingSpinner key={"SectionLoadingSpinner" + this.screenId} /></span>
          </Stack.Item>
        </Stack>
      );
    } else {
      return (
        <>
          {this.props.title ? (
            <Stack key={"SectionStack1" + this.screenId} verticalAlign="start" styles={{ root: { marginBottom: 10 } }}>
              <Stack.Item key={"SectionStack1Item" + this.screenId} align="stretch" styles={{ root: { position: "relative" } }}>
                <ScreenHeading key={"SectionHeading" + this.screenId} title={this.props.title} />
                {(this.props.isCollapsible) ? (<IconButton onClick={this.toggleCollapse} iconProps={{ iconName: isCollapsed ? "ChevronDown" : "ChevronUp" }} styles={{ root: { position: "absolute", right: 10, top: 0, height: 26 }, icon: { color: "black", fontSize: 10 } }} />) : ('')}
              </Stack.Item>
            </Stack>
          ) : (
            ""
          )}
          {(!isCollapsed) ? (
            <Stack horizontal wrap key={"SectionStack2" + this.screenId} horizontalAlign={this.horizontalAlign} verticalFill={true} tokens={{ childrenGap: 20 }}>
              {this.props.metadata ? (
                this.props.metadata.map((item) =>
                  <Stack.Item key={"SectionStack2Item" + this.screenId + "-" + item.id} styles={{ root: { borderBottom: "1px solid #f3f2f1", paddingBottom: 3, marginBottom: 3, paddingLeft: 15, width: item.dataField?.propertyType === "dataGroup" ? "100%" : "auto" } }}>
                    <Field
                      fieldModifier={this.props.fieldModifiers ? this.props.fieldModifiers[item.dataField?.propertyName!] : undefined}
                      isReadOnly={this.props.isReadOnly}
                      key={"SectionField-" + this.screenId + "-" + item.id}
                      data={currentData}
                      metadata={item}
                      onChange={this.onFieldUpdate}
                      onValidate={this.props.onFieldValidate}
                      handleFieldPermission={this.props.handleFieldPermission}
                    ></Field>
                  </Stack.Item>
                )
              ) : (
                ""
              )}
              {this.props.children ? (
                <Stack.Item key={"SectionStack2ChildrenItem" + this.screenId} styles={{ root: { width: "100%", height: "90%", overflow: "auto", textOverflow: "clip !important" } }} align={this.props.alignChildren}>
                  {this.props.children}
                </Stack.Item>
              ) : (
                ""
              )}
            </Stack>) : ('')}
        </>
      );
    }
  };
}