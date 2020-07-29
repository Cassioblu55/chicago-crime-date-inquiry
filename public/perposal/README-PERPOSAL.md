# Chicago Crime Date Inquiry


## 07/27/2020

Cassio Hudson

cassioisgreat.com

Chicago, IL


# Overview

The Chicago crime api displays crime statistics in a number of formats, date, type, if an arrest was made ect. However I feel it’s missing a necessary component, displaying historical data according to dates. Criminals are human, they are affected by natural effects and crimes fluctuate based on the time of year. For example the sites primary purpose will be displaying all crimes committed on the current date every year back to 2001. Additional functions will be displaying crime data by the week. Having a better understanding of when crimes happen will help us understand why they happen and how to prevent them.


# Goals



1. Integrate with [https://data.cityofchicago.org/](https://data.cityofchicago.org/) “Crimes - 2001 to present” data
2. Display historical crime data by today’s date
3. Display historical crime data for week data
4. Find the dates with the most criminal activity and display is based on the crime date.
5. Find the dates with the least criminal activity and display is based on the crime date.


# Specifications

All crime data will be piped directly from [https://data.cityofchicago.org/](https://data.cityofchicago.org/).Here is a display of all the data that will be used [All Data](https://data.cityofchicago.org/resource/ijzp-q8t2.json).

Data can be refined through the use of URL parameters. For example here is a readout of all crimes described as “BATTERY”: [Crimes by Type: Battery](https://data.cityofchicago.org/resource/ijzp-q8t2.json?primary_type=BATTERY) but more importantly we can search crimes by day: [All Crimes on June 13th from 2001 to 2020](https://data.cityofchicago.org/resource/ijzp-q8t2.json?$query=SELECT%20*%20WHERE%20date%20in(%20%272020-06-13%27,%20%272019-06-13%27,%20%272018-06-13%27,%20%272017-06-13%27,%272016-06-13%27,%20%272015-06-13%27,%272014-06-13%27,%20%272013-06-13%27,%272012-06-13%27,%20%272011-06-13%27,%272010-06-13%27,%20%272009-06-13%27,%272008-06-13%27,%20%272007-06-13%27,%272006-06-13%27,%20%272005-06-13%27,%272004-06-13%27,%20%272003-06-13%27,%272002-06-13%27,%20%272001-06-13%27)).

**Expected Data**


```
[
    {
        id: "12112225",
        case_number: "JD304722",
        date: "2020-07-19T23:51:00.000",
        block: "043XX S CHRISTIANA AVE",
        iucr: "2826",
        primary_type: "OTHER OFFENSE",
        description: "HARASSMENT BY ELECTRONIC MEANS",
        location_description: "RESIDENCE",
        arrest: false,
        domestic: false,
        beat: "0821",
        district: "008",
        ward: "14",
        community_area: "58",
        fbi_code: "26",
        x_coordinate: "1154740",
        y_coordinate: "1875707",
        year: "2020",
        updated_on: "2020-07-26T15:52:59.000",
        latitude: "41.814753662",
        longitude: "-87.707912113",
        location: {
            latitude: "41.814753662",
            longitude: "-87.707912113",
            human_address: "{
                "address": "", "city": "", "state": "", "zip": ""}"
        },
        :@computed_region_awaf_s7ux: "49",
        :@computed_region_6mkv_f3dw: "22248",
        :@computed_region_vrxf_vc4k: "55",
        :@computed_region_bdys_3d7i: "640",
        :@computed_region_43wa_7qmu: "8",
        :@computed_region_rpca_8um6: "56",
        :@computed_region_d9mm_jgwp: "13",
        :@computed_region_d3ds_rm58: "103"
    }
]


```


## Mockup

![Mockup](images/Mockup.png)
