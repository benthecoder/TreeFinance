# openapi_client.ImpactMetricsApi

All URIs are relative to *https://sandbox.api.mastercard.com/priceless-planet-coalition*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_impact_metrics**](ImpactMetricsApi.md#get_impact_metrics) | **GET** /impact-metrics | Impact Metrics Calculation


# **get_impact_metrics**
> ImpactMetric get_impact_metrics(donation_amount, currency)

Impact Metrics Calculation

Response contains user's contribution to sustainability

### Example

```python
from __future__ import print_function
import time
import openapi_client
from openapi_client.rest import ApiException
from pprint import pprint
# Defining the host is optional and defaults to https://sandbox.api.mastercard.com/priceless-planet-coalition
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "https://sandbox.api.mastercard.com/priceless-planet-coalition"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient() as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.ImpactMetricsApi(api_client)
    donation_amount = 5.0 # float | Amount being donated
currency = 'USD' # str | Currency in which amount is being donated format ISO-4217

    try:
        # Impact Metrics Calculation
        api_response = api_instance.get_impact_metrics(donation_amount, currency)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling ImpactMetricsApi->get_impact_metrics: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **donation_amount** | **float**| Amount being donated | 
 **currency** | **str**| Currency in which amount is being donated format ISO-4217 | 

### Return type

[**ImpactMetric**](ImpactMetric.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Impact Metrics |  -  |
**400** | Impact Metrics Bad Request Error |  -  |
**404** | Impact Metrics Not Found Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

