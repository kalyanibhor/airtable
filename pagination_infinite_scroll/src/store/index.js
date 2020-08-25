import React from "react";
import { connect } from "react-redux";
import { combineReducers } from "redux";
let states = {};
export const batch = (...actions) => ({ type: "@@BATCH", actions });
export const reinit = () => ({ type: "@@REINIT" });
const equations = {
  ">": (x, y) => x > y,
  "<": (x, y) => x < y,
  ">=": (x, y) => x >= y,
  "<=": (x, y) => x <= y,
  "===": (x, y) => x === y,
};
export const state = (stateName, machine) => {
  if (states[stateName]) {
    throw new Error(
      `State with name ${stateName} has been already defined somewhere else`
    );
  }
  states[stateName] = (state = machine.initial, action) => {
    if (action.type === reinit().type) {
      return machine.initial;
    }
    const match = String(action.type).match(`^${stateName}:(.*?)$`);
    if (!match) {
      return state;
    }
    const [, actionName] = match;
    return (machine.on[actionName] || ((o) => o))(state, action.payload);
  };
  return [
    // actions
    Object.keys(machine.on)
      .concat(machine.events)
      .reduce(
        (actionCreators, actionName) => ({
          ...actionCreators,
          [actionName]: (payload) => ({
            type: `${stateName}:${actionName}`,
            payload,
          }),
        }),
        {}
      ),
    // selector
    (selector = (_) => _, defaultValue) => (globalState) => {
      if (typeof defaultValue !== "undefined") {
        try {
          return selector(globalState[stateName]) || defaultValue;
        } catch {
          return defaultValue;
        }
      }
      return selector(globalState[stateName]);
    },
    // state component
    connect((globalState) => ({ store: globalState[stateName] }))(
      class extends React.PureComponent {
        static displayName = `${stateName}State`;
        render() {
          const {
            children,
            store,
            dispatch,
            not,
            more,
            moreOrEqual,
            less,
            lessOrEqual,
            ...props
          } = this.props;
          const equation = more
            ? equations[">"]
            : moreOrEqual
            ? equations[">="]
            : less
            ? equations["<"]
            : lessOrEqual
            ? equations["<="]
            : equations["==="];
          const predicate = !Object.keys(props).every((propName) =>
            equation(store[propName], props[propName])
          );
          if (!not ? predicate : !predicate) {
            return null;
          }
          if (typeof children === "function") {
            return children({
              ...store,
              dispatch,
            });
          }
          return children;
        }
      }
    ),
  ];
};
state.reducer = () => {
  const reducer = combineReducers(states);
  return (state = {}, action) => {
    switch (action.type) {
      case batch().type:
        return action.actions.reduce(reducer, state);
      default:
        return reducer(state, action);
    }
  };
};
state.clean = () => {
  states = {};
};
state.select = (propsToMap) => (globalState) => {
  return Object.keys(propsToMap).reduce(
    (props, propName) => ({
      ...props,
      [propName]: propsToMap[propName](globalState),
    }),
    {}
  );
};
state.actions = (...rules) => {
  let actionCreators = {};
  while (rules.length) {
    const actions = rules.shift();
    const pickRules = Array.isArray(rules[0])
      ? rules.shift()
      : Object.keys(actions);
    actionCreators = pickRules.reduce((acc, pickRule) => {
      let actionName = pickRule;
      let pickName = actionName;
      if (Array.isArray(pickRule)) {
        pickName = pickRule[0];
        actionName = pickRule[1];
      }
      return {
        ...acc,
        [actionName]: actions[pickName],
      };
    }, actionCreators);
  }
  return actionCreators;
};