import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import IconButton from "@material-ui/core/IconButton";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import withStyles from "@material-ui/core/styles/withStyles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import "./styles.css";

const tableStyle = theme => ({
  root: {
    width: "100%",
    overflowY: "auto"
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    // color: 'inherit',
    fontSize: "1em"
  },
  tableCell: {
    lineHeight: "1.42857143",
    padding: "5px 3px",
    paddingLeft: 10,
    verticalAlign: "middle"
  },
  tableCellReduzido: {
    lineHeight: "1.42857143",
    padding: 0,
    paddingLeft: 10,
    verticalAlign: "middle"
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: []
    };
  }
  render() {
    const {
      classes,
      tableHead,
      tableData,
      onOrder,
      tableHeaderColor,
      order,
      tagOrder,
      count,
      page,
      rowsPerPage,
      tableHeadAction,
      handleChangePage,
      handleChangeRowsPerPage,
      valueSelect,
      isSelected,
      selectAll,
      selectItem,
      actionBar,
      actionBarCheck,
      actionBarNotCheck,
      title,
      renderFooter,
      load,
      onClick
    } = this.props;
    return (
      <Paper className={classes.root}>
        {title && (
          <EnhancedTableToolbar
            valueSelect={valueSelect}
            numSelected={valueSelect && valueSelect.length}
            title={title}
            action={actionBar}
            actionBarCheck={actionBarCheck}
            actionBarNotCheck={actionBarNotCheck}
          />
        )}
        {load && (
          <div className={classes.spacer}>
            <LinearProgress />
          </div>
        )}
        <Table className={classes.table}>
          {tableHead !== undefined && (
            <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
              <TableRow>
                {valueSelect && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        valueSelect.length > 0 &&
                        valueSelect.length < tableData.length
                      }
                      checked={valueSelect.length === tableData.length}
                      onClick={() => selectAll()}
                    />
                  </TableCell>
                )}
                {tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableHeadCell
                      }
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {tableData.map((prop, key) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  onClick={event => {
                    if (selectItem) selectItem(key);
                    if (onClick) onClick(key);
                  }}
                  aria-checked={isSelected && isSelected(key)}
                  selected={isSelected && isSelected(key)}
                  key={key}
                >
                  {valueSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected(key)} />
                    </TableCell>
                  )}
                  {prop.map((prop, key) => {
                    return (
                      <TableCell
                        // onClick={()=> {console.log(prop)}}
                        className={classes.tableCell}
                        key={key}
                      >
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          {this.props.tablePagination && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    "aria-label": "Página Anterior"
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Próxima Página"
                  }}
                  labelRowsPerPage={"Por página"}
                  rowsPerPageOptions={[
                    5,
                    10,
                    15,
                    20,
                    25,
                    50,
                    100,
                    200,
                    300,
                    400
                  ]}
                  labelDisplayedRows={({ from, to, count }) => {
                    return `${from} a ${to} de ${count}`;
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
        {renderFooter && (
          <div className={classes.tableCell + " " + classes.tableHeadCell}>
            {renderFooter}
          </div>
        )}
      </Paper>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    padding: theme.spacing.unit,
    flexWrap: "wrap"
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  actions: {
    color: theme.palette.text.secondary,
    flexDirection: "row",
    display: "flex"
  },
  title: {
    flex: "0 0 auto",
    marginRight: "auto"
  }
});

let EnhancedTableToolbar = props => {
  const {
    numSelected,
    classes,
    actionBarCheck,
    actionBarNotCheck,
    action,
    title,
    valueSelect
  } = props;

  return (
    <Toolbar
      className={
        classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        }) +
        " " +
        "tab-title"
      }
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          valueSelect && (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          )
        ) : (
          <Typography variant="title" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.actions}>
        {action}
        {numSelected > 0 ? actionBarCheck : actionBarNotCheck}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

export default withStyles(tableStyle)(CustomTable);
