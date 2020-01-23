import java.text.*;
import java.time.format.*;
import java.time.*;
import java.util.*;

public class date {
	public static void main(String [] args) {
		List<List<Integer>> dateparts = Arrays.asList(
			Arrays.asList(2020, 1, 1, 0, 0, 0, 0),
			Arrays.asList(2020, 1, 1, 18, 0, 0, 0),
			Arrays.asList(2020, 3, 10, 0, 0, 0, 0),
			Arrays.asList(2020, 7, 20, 0, 0, 0, 0),
			Arrays.asList(2020, 10, 27, 0, 0, 0, 0),
			Arrays.asList(2020, 12, 31, 18, 43, 0, 0)
		);

		final StringBuilder sb = new StringBuilder("export default {\n");

		List<ZoneId> zones = Arrays.asList(ZoneOffset.UTC, ZoneId.of("EST", ZoneId.SHORT_IDS), ZoneId.of("NST", ZoneId.SHORT_IDS), ZoneId.of("JST", ZoneId.SHORT_IDS), ZoneOffset.ofHoursMinutes(-3, -30));
		List<String> sdfComponents = Arrays.asList("G", "y", "Y", "M", "w", "W", "D", "d", "F", "E", "u", "a", "H", "k", "K", "h", "m", "s", "S", "z", "Z", "X");
		List<String> dtfComponents = Arrays.asList("G", "u", "y", "D", "M", "L", "d", "Q", "q", "Y", "w", "W", "E", "e", "c", "F", "a", "h", "K", "k", "H", "m", "s", "S", "A", "n", "N", "V", "z", "O", "X", "x", "Z");

		sb.append("  \"DateTimeFormatter\": {\n");
		for (int c=0; c<dtfComponents.size(); c++) {
			final String component = dtfComponents.get(c);
//					Date d = Date.from(ldt.atZone(zone).toInstant());

			sb.append("    \"").append(component).append("\": {\n");
			for (int z=0; z<zones.size(); z++) {
				final ZoneId zone = zones.get(z);

				for (int d=0; d<dateparts.size(); d++) {
					final List<Integer> datepart = dateparts.get(d);
					final OffsetDateTime odt = OffsetDateTime.of(datepart.get(0), datepart.get(1), datepart.get(2), datepart.get(3), datepart.get(4), datepart.get(5), datepart.get(6), ZoneOffset.UTC);
					final ZonedDateTime zdt = odt.atZoneSameInstant(zone).withZoneSameInstant(zone.getRules().getOffset(odt.toInstant()));

					sb.append("      \"").append(zdt.toString()).append("\": [ ");

					for (Integer count : Arrays.asList(1, 2, 3, 4)) {
						try {
							final String formatString = new String(new char[count]).replace("\0", component);
							DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formatString);
							final String formatted = zdt.format(formatter);
							sb.append("\"").append(formatted).append("\"");
						} catch (final Exception e) {
							sb.append("null");
						}
						if (count == 4) {
							sb.append(" ]");
						} else {
							sb.append(", ");
						}
					}

					sb.append(",\n");
				}
			}
			sb.append("    },\n");
		}
		sb.append("  },\n");

		sb.append("  \"SimpleDateFormat\": {\n");
		for (int c=0; c<sdfComponents.size(); c++) {
			final String component = sdfComponents.get(c);
			sb.append("    \"").append(component).append("\": {\n");

			for (int z=0; z<zones.size(); z++) {
				final ZoneId zone = zones.get(z);

				for (int d=0; d<dateparts.size(); d++) {
					final List<Integer> datepart = dateparts.get(d);
					final OffsetDateTime odt = OffsetDateTime.of(datepart.get(0), datepart.get(1), datepart.get(2), datepart.get(3), datepart.get(4), datepart.get(5), datepart.get(6), ZoneOffset.UTC);
					final ZonedDateTime zdt = odt.atZoneSameInstant(zone);
					final Date date = Date.from(zdt.toInstant());

					sb.append("      \"").append(zdt.toOffsetDateTime().toString()).append("\": [ ");

					for (Integer count : Arrays.asList(1, 2, 3, 4)) {
						try {
							final String formatString = new String(new char[count]).replace("\0", component);
							final SimpleDateFormat formatter = new SimpleDateFormat(formatString);
							final String formatted = formatter.format(date);
							sb.append("\"").append(formatted).append("\"");
						} catch (final Exception e) {
							sb.append("null");
						}
						if (count == 4) {
							sb.append(" ]");
						} else {
							sb.append(",");
						}
					}
					sb.append(",\n");
				}
			}
			sb.append("    },\n");
		}
		sb.append("  },\n");

		sb.append("};");
		System.out.println(sb.toString());
	}
}
