import { tabHeaderStyles } from "@/styles/components/tabHeader";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export enum TabValue {
  DONE = "Done",
  TODO = "To do",
}

export interface TabItem {
  label: string;
  value: string;
}

interface TabHeaderProps {
  tabs: TabItem[];
  activeTabLabel: string;
  onChange: (tab: string) => void;
}

export function TabHeader({ tabs, activeTabLabel, onChange }: TabHeaderProps) {
  return (
    <View style={tabHeaderStyles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tabHeaderStyles.scrollContainer}
      >
        {tabs.map((tab) => {
          const isActive = tab.label === activeTabLabel;
          return (
            <TouchableOpacity
              key={tab.label}
              onPress={() => onChange(tab.label)}
              style={tabHeaderStyles.tabContainer}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  tabHeaderStyles.tabText,
                  isActive && tabHeaderStyles.tabTextActive,
                ]}
              >
                {tab.value}
              </Text>
              {isActive && <View style={tabHeaderStyles.underline} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{ width: "100%" }}
      >
        <View style={tabHeaderStyles.fullDivider} />
      </ScrollView>
    </View>
  );
}
