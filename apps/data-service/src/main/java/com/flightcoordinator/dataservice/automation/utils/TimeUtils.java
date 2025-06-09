package com.flightcoordinator.dataservice.automation.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

public class TimeUtils {
  public static LocalDateTime getNow() {
    return LocalDateTime.now();
  }

  public static boolean isDatePassed(Date date) {
    LocalDateTime localDate = dateToLocalDateTime(date);
    return LocalDateTime.now().isAfter(localDate);
  }

  public static boolean doesDateGoOverAfterDifference(Optional<Date> startDate, Date endDate, float difference) {
    LocalDateTime startLocalDateTime = startDate.map(TimeUtils::dateToLocalDateTime).orElse(LocalDateTime.now());
    LocalDateTime expectedLocalDateTime = dateToLocalDateTime(endDate);

    int hours = (int) difference;
    int minutes = Math.round((difference - hours) * 60);

    LocalDateTime realEndLocalDateTime = startLocalDateTime.plusHours(hours).plusMinutes(minutes);
    return realEndLocalDateTime.isAfter(expectedLocalDateTime);
  }

  private static LocalDateTime dateToLocalDateTime(Date date) {
    return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
  }
}
