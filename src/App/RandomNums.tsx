import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import styled from '@emotion/styled';


@observer
export class EmployeesList extends React.Component {

    render() {
      
      return(
        <div className="mainSection">
           <Row  />
        </div>
      )
    }
  }
  

  const RowWrapper = styled('div')`
    width: 100%;
  `
  interface RowPropsType{
  
  }
  @observer
  class Row extends React.Component<RowPropsType> {
    @observable isCollapsed: boolean = true;

    render(){
      return (
        <RowWrapper>
          xxx
        </RowWrapper>
      );
    }
  }
  
