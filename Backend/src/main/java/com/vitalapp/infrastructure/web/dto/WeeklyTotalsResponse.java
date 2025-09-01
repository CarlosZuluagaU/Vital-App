package com.vitalapp.infrastructure.web.dto;

import java.time.LocalDate;
import java.util.List;

public class WeeklyTotalsResponse {
    private LocalDate fromDate;
    private LocalDate toDate;
    private List<Item> items;

    public WeeklyTotalsResponse() {}

    public WeeklyTotalsResponse(LocalDate fromDate, LocalDate toDate, List<Item> items) {
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.items = items;
    }

    public LocalDate getFromDate() { return fromDate; }
    public void setFromDate(LocalDate fromDate) { this.fromDate = fromDate; }
    public LocalDate getToDate() { return toDate; }
    public void setToDate(LocalDate toDate) { this.toDate = toDate; }
    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }

    public static class Item {
        private LocalDate date;
        private Integer totalMinutes;

        public Item() {}

        public Item(LocalDate date, Integer totalMinutes) {
            this.date = date;
            this.totalMinutes = totalMinutes;
        }

        public LocalDate getDate() { return date; }
        public void setDate(LocalDate date) { this.date = date; }
        public Integer getTotalMinutes() { return totalMinutes; }
        public void setTotalMinutes(Integer totalMinutes) { this.totalMinutes = totalMinutes; }
    }
}
